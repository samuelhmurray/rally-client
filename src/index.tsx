import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* add component here */}
    <div className="bg-slate-500">
      <h2>hi</h2>
    </div>
  </React.StrictMode>
);
