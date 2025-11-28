// src/components/DiaryList.jsx
import { useEffect, useState } from "react";
import { getDiaries, deleteDiary } from "../api/DiaryApi"; // deleteDiary 추가

export default function DiaryList({ refresh, onDelete }) {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDiaries();
        setDiaries(data.reverse());
      } catch (error) {
        console.error("일기 불러오기 실패:", error);
      }
    }
    fetchData();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteDiary(id);
      // 삭제 후 리스트 갱신
      onDelete(); 
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 실패");
    }
  };

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
            position: "relative"
          }}
        >
          <div style={{ fontSize: "12px", color: "#888" }}>{d.date}</div>
          <div style={{ fontSize: "20px", fontWeight: "bold", color: "#333", margin: "5px 0" }}>{d.title}</div>
          <div style={{ fontSize: "16px", margin: "8px 0", color: "#555" }}>{d.content}</div>
          <div style={{ fontSize: "14px", fontStyle: "italic", color: "#777" }}>{d.mood}</div>

          <button
            onClick={() => handleDelete(d.id)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "5px 10px",
              fontSize: "12px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#e53e3e",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
