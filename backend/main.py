from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from db import get_db_connection

app = FastAPI(title="Diary API")

# 데이터 모델
class Diary(BaseModel):
    date: str      # YYYY-MM-DD
    title: str
    content: str
    mood: str

# 루트 엔드포인트
@app.get("/")
def root():
    return {"message": "ㅎㅇ"}

# 일기 생성
@app.post("/diaries")
def create_diary(diary: Diary):
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        sql = "INSERT INTO diaries (date, title, content, mood) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (diary.date, diary.title, diary.content, diary.mood))
        conn.commit()
        conn.close()
        return {"message": "Diary created successfully"}
    raise HTTPException(status_code=500, detail="Database connection failed")

# 모든 일기 조회
@app.get("/diaries")
def get_diaries():
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM diaries")
        rows = cursor.fetchall()
        conn.close()
        return rows
    raise HTTPException(status_code=500, detail="Database connection failed")
