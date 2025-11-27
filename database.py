import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="설정한비밀번호",  # 설치 시 입력한 비밀번호
            database="diary_db"
        )
        return conn
    except Error as e:
        print(f"Error: {e}")
        return None
