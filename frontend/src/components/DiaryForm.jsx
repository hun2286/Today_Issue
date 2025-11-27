// src/components/DiaryForm.jsx
import { useState } from "react";
import { createDiary } from "../api/DiaryApi";

export default function DiaryForm({ onSuccess }) {
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("normal");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDiary({ 
        date: data,    // 여기서 key를 'date'로 변경
        title, 
        content, 
        mood 
      });
      setData("");
      setTitle("");
      setContent("");
      setMood("normal");
      onSuccess(); // 리스트 갱신
    } catch (err) {
      console.error(err.response || err);
      alert("저장 실패");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "600px",
        margin: "auto",
        padding: "25px",
        borderRadius: "12px",
        backgroundColor: "#f0f4f8",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>새 일기 작성</h2>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        required
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "6px",
          border: "1px solid #ccc" 
        }}
      />
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        style={{
          width: "90%",
          padding: "10px",
          margin: "10px 0",
          height: "120px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          resize: "none"
        }}
      />
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={{
          width: "50%",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "6px",
          border: "1px solid #ccc" 
        }}
      >
        <option value="normal">Normal</option>
        <option value="private">Private</option>
      </select>
      <br />
      <button
        type="submit"
        style={{
          padding: "10px 25px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#4f46e5",
          color: "#fff",
          marginTop: "10px",
        }}
      >
        저장
      </button>
    </form>
  );
}
