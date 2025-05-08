import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
import ExpContextProvider from "./context/ExpContext.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(

  <BrowserRouter> {/* ✅ Add this */}
    <QueryClientProvider client={queryClient}>
      <ExpContextProvider>
        <App />
      </ExpContextProvider>
    </QueryClientProvider>
  </BrowserRouter>

);
