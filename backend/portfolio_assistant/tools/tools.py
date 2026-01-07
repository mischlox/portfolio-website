# tools.py
from typing import Optional
from langchain_core.tools import tool
from .rag import retriever

@tool
def retrieve_portfolio_info(query: str):
    """
    Use this tool to retrieve specific information about Michael Schlosser
    """
    print(f"--- TOOL CALL: Retrieving info for: {query} ---")
    retrieved_docs = retriever.invoke(query)
    return "\n\n".join([doc.page_content for doc in retrieved_docs])

@tool
def send_email(user_email: str, message_body: str, subject: str = "Portfolio Inquiry"):
    """
    Send an email to Michael on behalf of the user.
    """
    # TODO: Logic to actually send email would go here
    print(f"--- TOOL CALL: Sending Email to Michael from {user_email} ---")
    return f"Email successfully sent from {user_email}. Subject: {subject}"

@tool
def log_unanswered_question(question: str, user_name: Optional[str] = "Anonymous"):
    """
    Log an unanswered question about Michael Schlosser.
    """
    # TODO: Logic to actually save question would go here
    print(f"--- TOOL CALL: Logging Unanswered Question from {user_name}: {question} ---")
    return f"Question logged: {question}"
