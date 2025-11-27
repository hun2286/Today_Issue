// src/components/DiaryList.jsx
import { useEffect, useState } from "react";
import { getDiaries } from "../api/DiaryApi";

export default function DiaryList({ refresh }) {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDiaries();
        setDiaries(data.reverse()); // 최신순
      } catch (error) {
        console.error("일기 불러오기 실패:", error);
      }
    }
    fetchData();
  }, [refresh]);

  if (diaries.length === 0) return <p style={{ textAlign: "center", color: "#555" }}>저장된 일기가 없습니다.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      {diaries.map((d) => (
        <div
          key={d.id}
          style={{
            textAlign: "left",
            padding: "15px 20px",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            marginBottom: "15px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#888" }}>{d.date}</div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#333", margin: "5px 0" }}>{d.title}</div>
          <div style={{ fontSize: "16px", margin: "8px 0", color: "#555" }}>{d.content}</div>
          <div style={{ fontSize: "14px", fontStyle: "italic", color: "#777" }}>{d.mood}</div>
        </div>
      ))}
    </div>
  );
}
