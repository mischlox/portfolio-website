# utils.py
import os

def load_prompt(file_name: str = "system_prompt.md") -> str:
    file_path = os.path.join(os.path.dirname(__file__), "..", "prompts", file_name)
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"ERROR: System prompt file not found at {file_path}. Using fallback.")
        return ""