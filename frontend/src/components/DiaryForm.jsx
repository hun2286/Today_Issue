import { useState } from "react";
import { createDiary } from "../api/DiaryApi";

export default function DiaryForm({ onSuccess }) {
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mode, setMode] = useState("normal");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDiary({ data, title, content, mode });
      alert("일기 저장 완료!");
      onSuccess(); // 목록 갱신용
      setData("");
      setTitle("");
      setContent("");
      setMode("normal");
    } catch (err) {
      console.error(err);
      alert("저장 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />
      <input type="text" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} required />
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="normal">Normal</option>
        <option value="private">Private</option>
      </select>
      <button type="submit">저장</button>
    </form>
  );
}
