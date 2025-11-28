from fastapi import FastAPI, HTTPException, Request
import db
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # 개발용: 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],       # GET, POST, PUT, DELETE, OPTIONS 등 모두 허용
    allow_headers=["*"],
)

class DiaryCreate(BaseModel):
    date: str = Field(..., example="2025-01-01")
    title: str
    content: str
    mood: str = Field(..., pattern="^(normal|private)$")

class DiaryUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    mood: Optional[str] = Field(None, pattern="^(normal|private)$")

# -------------------------------
# Create
# -------------------------------
@app.post("/diaries/")
async def create_diary(request: Request):
    data = await request.json()
    required_fields = ["date", "title", "content", "mood"]
    for field in required_fields:
        if field not in data:
            raise HTTPException(status_code=400, detail=f"{field} is required")
    
    conn = db.get_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO diaries (date, title, content, mood) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (data["date"], data["title"], data["content"], data["mood"]))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Diary created successfully"}

# -------------------------------
# Read All
# -------------------------------
@app.get("/diaries/")
def get_diaries():
    conn = db.get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM diaries")
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return results

# -------------------------------
# Read by ID
# -------------------------------
@app.get("/diaries/{diary_id}")
def get_diary(diary_id: int):
    conn = db.get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM diaries WHERE id=%s", (diary_id,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    if result:
        return result
    raise HTTPException(status_code=404, detail="Diary not found")

# -------------------------------
# Update
# -------------------------------
@app.put("/diaries/{diary_id}")
async def update_diary(diary_id: int, body: DiaryUpdate):
    fields = []
    params = []

    update_data = body.dict(exclude_unset=True)

    for key, value in update_data.items():
        fields.append(f"{key}=%s")
        params.append(value)

    if not fields:
        raise HTTPException(status_code=400, detail="No fields to update")

    params.append(diary_id)

    conn = db.get_connection()
    cursor = conn.cursor()

    sql = f"UPDATE diaries SET {', '.join(fields)} WHERE id=%s"
    cursor.execute(sql, tuple(params))

    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Diary updated successfully"}

# -------------------------------
# Delete
# -------------------------------
@app.delete("/diaries/{diary_id}")
def delete_diary(diary_id: int):
    conn = db.get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM diaries WHERE id=%s", (diary_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Diary deleted successfully"}
