import React from "react";
import "./App.css";
import Nodes from "./components/Nodes";

function App() {
  return (
    <>
      <h1>고양이 사진첩</h1>
      <main className="app">
        <Nodes />
      </main>
    </>
  );
}

export default App;
