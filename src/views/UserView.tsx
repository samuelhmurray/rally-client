import React from "react";
import { Nav } from "../components/nav/Nav";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { MyNeeds } from "../components/need/MyNeeds";
import { AllNeeds } from "../components/need/AllNeeds";
import { AddNeed } from "../components/need/AddNeed";

export const UserView = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mine" element={<MyNeeds />} />
        <Route path="/all" element={<AllNeeds />} />
        <Route path="/add" element={<AddNeed />} />
      </Routes>
    </>
  );
};
