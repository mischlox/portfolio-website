# tools.py
import datetime
from langchain_core.tools import tool
from .rag import retriever
from .db_manager import insert_unanswered_question

@tool
def retrieve_portfolio_info(query: str):
    """
    Use this tool to retrieve specific information about Michael Schlosser
    """
    print(f"--- TOOL CALL: Retrieving info for: {query} ---")
    retrieved_docs = retriever.invoke(query)
    return "\n\n".join([doc.page_content for doc in retrieved_docs])

@tool
def log_unanswered_question(question: str, user_name: str = "Anonymous"):
    """
    Log an unanswered question about Michael Schlosser to a database with a timestamp.
    """
    timestamp = datetime.datetime.now().isoformat()
    try:
        log_message = insert_unanswered_question(question, user_name, timestamp)
        
        print(f"--- TOOL CALL: {log_message} ---")
        return log_message

    except RuntimeError as e:
        error_message = f"Database ERROR logging question: {e}"
        print(f"--- TOOL CALL: {error_message} ---")
        return error_message
    
