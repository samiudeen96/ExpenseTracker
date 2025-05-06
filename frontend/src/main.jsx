import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
import ExpContextProvider from "./context/ExpContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter> {/* ✅ Add this */}
      <ExpContextProvider>
        <App />
      </ExpContextProvider>
    </BrowserRouter>
);
