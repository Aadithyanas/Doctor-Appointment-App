import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Correct alias for BrowserRouter
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./contex/ThemeContex.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ThemeProvider>
);
