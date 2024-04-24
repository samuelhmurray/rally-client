import React from "react";
import { Route, Routes } from "react-router-dom";
import { MyNeeds } from "./components/need/MyNeeds";
import { AllNeeds } from "./components/need/AllNeeds";
import { AddNeed } from "./components/need/AddNeed";
import { Login } from "./components/login/Login";
import { Home } from "./components/Home";

export const App = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mine" element={<MyNeeds />} />
      <Route path="/all" element={<AllNeeds />} />
      <Route path="/add" element={<AddNeed />} />
    </Routes>
  );
};

export default App;
