import { useEffect, useState } from "react";
import { getDiaries } from "../api/DiaryApi";

export default function DiaryList({ refresh }) {
  const [diaries, setDiaries] = useState([]);

  const fetchDiaries = async () => {
    const data = await getDiaries();
    setDiaries(data);
  };

  useEffect(() => {
    fetchDiaries();
  }, [refresh]);

  return (
    <div>
      <h2>일기 목록</h2>
      {diaries.map((d) => (
        <div key={d.id}>
          <h3>{d.title} ({d.data})</h3>
          <p>{d.content}</p>
          <p>Mode: {d.mode}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
