import React, { useState, useEffect } from "react";
import { Nav } from "../components/nav/Nav";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { MyNeeds } from "../components/need/MyNeeds";
import { AllNeeds } from "../components/need/AllNeeds";
import { AddNeed } from "../components/need/AddNeed";
import { EditNeed } from "../components/need/EditNeed";

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

export const UserView = () => {
  const [currentUser, setCurrentUser] = useState<User>({ 
    id: 0, 
    username: "",
    first_name: "",
    last_name: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []); 


  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mine" element={<MyNeeds currentUser={currentUser} />} />
        <Route path="/all" element={<AllNeeds />} />
        <Route path="/add" element={<AddNeed currentUser={currentUser}/>} />
        <Route path="/need/:needId" element={<EditNeed currentUser={currentUser}/>} />
      </Routes>
    </>
  );
};
