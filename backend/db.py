import mysql.connector
from mysql.connector import Error

def get_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',          # MySQL 호스트
            database='diary_db',       # 데이터베이스 이름
            user='your_username',      # MySQL 계정
            password='your_password'   # MySQL 비밀번호
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None