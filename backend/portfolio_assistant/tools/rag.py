# rag.py
import os
import time
import json
import shutil
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter, MarkdownHeaderTextSplitter
from langchain_community.document_loaders import DirectoryLoader, TextLoader, PyPDFLoader
from langchain_core.documents import Document

load_dotenv()

PERSIST_DIRECTORY = "data/vectordb/chroma_db"
DATA_DIRECTORY = "data/source"
LAST_UPDATE_FILE = os.path.join(PERSIST_DIRECTORY, ".last_update")

def should_rebuild_vectorstore():
    if not os.path.exists(LAST_UPDATE_FILE):
        return True

    with open(LAST_UPDATE_FILE, 'r') as f:
        try:
            last_build_time = float(f.read().strip())
        except ValueError:
            return True

    if not os.path.exists(DATA_DIRECTORY):
        return False

    for root, _, files in os.walk(DATA_DIRECTORY):
        for file in files:
            file_path = os.path.join(root, file)
            if file_path.endswith(('.md', '.txt', '.pdf', '.json')):
                mod_time = os.path.getmtime(file_path)
                if mod_time > last_build_time:
                    print(f"--- RAG Check: File '{file}' is newer. Rebuilding. ---")
                    return True
    
    return False

def load_documents_with_metadata():
    docs = []
    
    if not os.path.exists(DATA_DIRECTORY) or not os.listdir(DATA_DIRECTORY):
        print("--- RAG: No data directory or empty, loading samples. ---")
        return [
            Document(
                page_content="Experienced **Software Engineer** (M.Sc.) specializing in **C++ and Python** in the fields of **Embedded Systems, Real-Time Applications, Computer Vision**, **Deep Learning** and **Sensor Fusion**. Profound knowledge in developing complex software components for the defense and automotive industries.", 
                metadata={"document_type": "resume", "language": "en"}
             )
        ]
        
    print("--- RAG: Loading documents and merging sidecar metadata. ---")
    
    loaded_docs = []

    # Load PDFs
    # TODO: Needs to be improved. Retrieval results are not good
    pdf_loader = DirectoryLoader(
        DATA_DIRECTORY, 
        glob="**/*.pdf", 
        loader_cls=PyPDFLoader, 
        recursive=True
    )
    loaded_docs.extend(pdf_loader.load())
    
    # Load Markdown/Text
    text_loader = DirectoryLoader(
        DATA_DIRECTORY, 
        glob=["**/*.md", "**/*.txt"],
        loader_cls=TextLoader, 
        recursive=True
    )
    loaded_docs.extend(text_loader.load())

    # Add sidecar metadata
    for doc in loaded_docs:
        source_path = doc.metadata.get("source")
        
        if source_path:
            base, _ = os.path.splitext(source_path)
            sidecar_path = base + ".json"
            
            if os.path.exists(sidecar_path):
                if source_path.endswith(".json"): continue 

                print(f"    - Found sidecar for: {os.path.basename(source_path)}")
                try:
                    with open(sidecar_path, 'r') as f:
                        sidecar_metadata = json.load(f)
                        doc.metadata.update(sidecar_metadata)
                except json.JSONDecodeError:
                    print(f"    - WARNING: Invalid JSON in {os.path.basename(sidecar_path)}. Skipping.")
            
            doc.metadata["source_filename"] = os.path.basename(source_path)
            
        docs.append(doc)

    return docs

def split_documents_markdown(docs: list[Document]) -> list[Document]:
    
    headers_to_split_on = [
        ("#", "Header1"),
        ("##", "Header2"),
        ("###", "Header3"),
    ]

    splits = []
    
    for doc in docs:
        # Only process Markdown/Text files this way
        if doc.metadata.get("source_filename", "").endswith(('.md', '.txt')):
            
            markdown_splitter = MarkdownHeaderTextSplitter(
                headers_to_split_on=headers_to_split_on,
                strip_headers=False # Keep the headings in the content for context
            )
            
            markdown_splits = markdown_splitter.split_text(doc.page_content)
            
            # Carry over metadata (like source_filename) to the new chunks
            for split in markdown_splits:
                # Add the specific header level metadata (e.g., 'Header2': 'PROFESSIONAL EXPERIENCE')
                split.metadata.update(doc.metadata)
            
            splits.extend(markdown_splits)
            
        else:
            # For PDFs or other unstructured files, use a standard recursive split
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            splits.extend(text_splitter.split_documents([doc]))

    return splits

def get_retriever():
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small", 
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY")
    )

    should_rebuild = should_rebuild_vectorstore()
    
    if should_rebuild or not os.path.exists(PERSIST_DIRECTORY):
        print("--- RAG: Creating new Vector Store (due to missing or updated files) ---")
        if os.path.exists(PERSIST_DIRECTORY):
            print(f"--- RAG: Deleting old persistence directory for clean rebuild: {PERSIST_DIRECTORY} ---")
            shutil.rmtree(PERSIST_DIRECTORY)
        os.makedirs(PERSIST_DIRECTORY, exist_ok=True)
        
        docs = load_documents_with_metadata()
        splits = split_documents_markdown(docs)

        vectorstore = Chroma.from_documents(
            documents=splits,
            embedding=embeddings,
            persist_directory=PERSIST_DIRECTORY
        )
        
        with open(LAST_UPDATE_FILE, 'w') as f:
            f.write(str(time.time()))
        
    else:
        print("--- RAG: Loading existing Vector Store (no changes detected) ---")
        vectorstore = Chroma(
            persist_directory=PERSIST_DIRECTORY, 
            embedding_function=embeddings
        )

    return vectorstore.as_retriever(search_kwargs={"k": 5})

retriever = get_retriever()