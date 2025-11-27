import { useState } from "react";
import DiaryForm from "./components/DiaryForm";
import DiaryList from "./components/DiaryList";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Diary App</h1>
      <DiaryForm onSuccess={() => setRefresh(!refresh)} />
      <DiaryList refresh={refresh} />
    </div>
  );
}

export default App;
