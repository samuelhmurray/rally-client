import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import App from "./app";
import { Nav } from "./components/nav/Nav";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Nav/>
     <App/>
    </BrowserRouter>
  </React.StrictMode>
);
