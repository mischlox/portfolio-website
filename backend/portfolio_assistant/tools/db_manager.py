import datetime
from typing import Optional
from langchain_core.tools import tool
import sqlite3
import os

DB_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__), 
        os.pardir, 
        os.pardir, 
        "data", 
        "questions", 
        "unanswered_questions.db"
    )
)

def insert_unanswered_question(question: str, user_name: str, timestamp: str) -> str:
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            
            cursor.execute(
                "INSERT INTO unanswered_questions (question, user_name, timestamp) VALUES (?, ?, ?)",
                (question, user_name, timestamp)
            )
        return f"Question logged: '{question}' by {user_name} at {timestamp}"

    except sqlite3.Error as e:
        raise RuntimeError(f"Database insertion failed: {e}") from e

def setup_database():
    db_dir = os.path.dirname(DB_PATH)
    os.makedirs(db_dir, exist_ok=True)
    
    conn = None
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS unanswered_questions (
                id INTEGER PRIMARY KEY,
                question TEXT NOT NULL,
                user_name TEXT,
                timestamp TEXT NOT NULL
            );
        """)
        conn.commit()
    except sqlite3.Error as e:
        print(f"ERROR: Database setup failed: {e}")
    finally:
        if conn:
            conn.close()

setup_database()