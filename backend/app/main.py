# main.py
import os
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.email_api import router as email_router
from portfolio_assistant.core.assistant import PortfolioAssistant

DEV_MODE = os.getenv("APP_ENV") == "dev"
print(f"Server starting in: {'DEV (Ollama)' if DEV_MODE else 'PROD (OpenRouter)'} Mode")

portfolio_assistant = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Initializes the assistant when the server starts.
    This prevents re-initializing the LLM connection on every request.
    """
    global portfolio_assistant
    portfolio_assistant = PortfolioAssistant(dev_mode=DEV_MODE)
    yield
    # Cleanup code (if needed) goes here
    print("Shutting down Portfolio Assistant...")

app = FastAPI(title="Portfolio Chat API", lifespan=lifespan)

app.include_router(email_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: List[Message]

@app.get("/")
def read_root():
    mode = "DEVELOPER (Local Ollama)" if DEV_MODE else "PRODUCTION (OpenRouter)"
    return {"status": "ok", "mode": mode}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if not portfolio_assistant:
        raise HTTPException(status_code=500, detail="Assistant not initialized")

    # Pass the request to the assistant
    result = await portfolio_assistant.chat(
        user_input=request.message,
        history=[m.dict() for m in request.history]
    )
    response_text = result["messages"][-1].content
    return {
            "response": response_text,
            "action": result.get("next_action", "none") # Add a new key for the action
        }

if __name__ == "__main__":
    print(f"Starting Server. Dev Mode: {DEV_MODE}")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=DEV_MODE)