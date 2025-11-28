// src/App.jsx
import { useState } from "react";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
        <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", // 세로/가로 중앙 이동
        width: "auto",      // 컨테이너 자체 크기는 그대로
        minWidth: "600px",  // 원하면 최소 너비
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Diary App</h1>
      <DiaryForm onSuccess={() => setRefresh(!refresh)} />
      <DiaryList refresh={refresh} onDelete={() => setRefresh(!refresh)} />
    </div>
  );
}

export default App;
