# main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    role: str # 'user' or 'ai'
    text: str

class ChatRequest(BaseModel):
    message: str
    history: List[Message]
    
api = FastAPI(title="Portfolio Chat API", version="1.0")

from fastapi.middleware.cors import CORSMiddleware
origins = [
    "http://localhost:3000",  # Your Next.js frontend default port
]
api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@api.get("/")
def read_root():
    """Simple root check to confirm the API is running."""
    return {"status": "ok", "message": "Chatbot API is operational."}


@api.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """Handles the chat request and returns a simple echo response."""
    
    user_message = request.message
    
    # --- Simplified Communication Test Logic ---
    
    if "hello" in user_message.lower():
        response_text = "Hello! I see your frontend is successfully communicating with the FastAPI backend."
    elif len(request.history) > 0:
        response_text = "I received your message and history. The connection is working, but the RAG agent is not yet active."
    else:
        response_text = f"ECHO: You sent '{user_message}'. Connection established."
        
    # ------------------------------------------

    # Return the response structure expected by the frontend
    return {"response": response_text}