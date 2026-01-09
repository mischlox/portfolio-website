## Portfolio Chat API

This FastAPI project serves as the backend for a professional portfolio, providing an **AI Assistant** and an **Email Contact Service**. It utilizes Retrieval-Augmented Generation (RAG) with LangGraph to answer user questions about my professional background and skills.

### Key Features

* **Intelligent RAG Chatbot:** Answers career-related questions by searching a private, up-to-date document database (Chroma Vector Store).
* **Email Service:** Handles contact form submissions (`/submit-contact`), sending a primary email to the owner and an automated confirmation to the sender.
* **Auto Vector Store Refresh:** Automatically checks source documents for updates and rebuilds the RAG vector store when changes are detected.

### Architecture Overview (The Portfolio Assistant)

The core chat logic is implemented as a state machine using **LangGraph**, enabling a non-linear, multi-step thought process for the AI Assistant.

![Portfolio Assistant LangGraph Flow](res/assistant_graph.png)

1.  **Router Node:** Classifies user intent (`search`, `email`, or `chat`).
2.  **Retrieve Node:** Executes a RAG search if the intent is `search`.
3.  **Grade Node:** An LLM determines if the retrieved context is **'good'** or **'bad'** for answering the query.
4.  **Generation Nodes:** Generates a concise answer based on the grade, or logs the query and suggests email contact if the information is unavailable.
5.  **Email Node:** Sets a specific command (`EMAIL_ACTION_COMMAND`) for the frontend to trigger a contact form interaction.

The graph defines the explicit flow between these nodes, ensuring the assistant operates within defined guardrails.

### Getting Started

#### Prerequisites

* Python 3.10+
* OpenRouter API Key (for PROD)
* Email Credentials (for contact form)

#### Installation & Configuration

1.  **Install dependencies:** `pip install -r requirements.txt`
2.  **Configure `.env`:** Set `OPENROUTER_API_KEY` and all `MAIL_*` variables.
3.  **Source Data:** Place markdown, text, or PDF files into the `data/source/` directory. The vector store is built on first run.

#### Running the Server

* **Development Mode (Ollama):** Requires local Ollama server running.
    ```bash
    APP_ENV=dev uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
* **Production Mode (OpenRouter):**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```
