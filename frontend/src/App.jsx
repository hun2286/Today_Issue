// src/App.jsx
import { useState } from "react";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 전체 페이지 중앙 정렬
        justifyContent: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ textAlign: "center", color: "black", marginBottom: "20px" }}>Diary App</h1>
      
      <div
        style={{
          width: "100%",
          maxWidth: "600px", // 화면 크기 제한
          marginBottom: "30px",
        }}
      >
        <DiaryForm onSuccess={() => setRefresh(!refresh)} />
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "600px", // 화면 크기 제한
        }}
      >
        <DiaryList refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
