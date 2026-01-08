import os
from langchain_openai import ChatOpenAI
from langchain_ollama import ChatOllama
from dotenv import load_dotenv

load_dotenv()

class FrontendCommands:
    EMAIL_ACTION_COMMAND = "SCROLL_TO_CONTACT"

def _get_ollama_model(temperature: float):
    model_name = os.getenv("OLLAMA_MODEL")
    if not model_name:
        raise EnvironmentError(
            "Environment variable OLLAMA_MODEL not set. Cannot run in development mode."
        )
    return ChatOllama(model=model_name, temperature=temperature)

def _get_openrouter_model(temperature: float):
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "Environment variable OPENROUTER_API_KEY not set. Cannot run in production mode."
        )
    
    return ChatOpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
        temperature=temperature,
        model="google/gemini-2.0-flash-lite-001"
    )

def create_model(dev_mode: bool, temperature: float = 0.7):
    if dev_mode:
        return _get_ollama_model(temperature)
    else:
        return _get_openrouter_model(temperature)