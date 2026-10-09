import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToolStoreProvider } from "./lib/toolStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToolStoreProvider>
      <App />
    </ToolStoreProvider>
  </React.StrictMode>
);
