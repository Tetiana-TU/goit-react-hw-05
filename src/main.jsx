import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// Створюємо корінь для рендерингу в React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

// Рендеримо додаток всередині кореня
root.render(
  <Router>
    {" "}
    {/* Обгортаємо весь додаток в Router */}
    <App />
  </Router>
);
