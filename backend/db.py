import os
import mysql.connector
from dotenv import load_dotenv

load_dotenv()  # .env 파일 읽기

def get_connection():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DB_HOST", "localhost"),
            user=os.getenv("DB_USER", "root"),
            password=os.getenv("DB_PASSWORD", ""),
            database=os.getenv("DB_NAME", "diary_db")
        )
        return conn
    except mysql.connector.Error as e:
        print("DB 연결 실패:", e)
        return None