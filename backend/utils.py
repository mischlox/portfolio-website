# utils.py

def load_prompt(file_path: str = "system_prompt.md") -> str:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"ERROR: System prompt file not found at {file_path}. Using fallback.")
        return ""