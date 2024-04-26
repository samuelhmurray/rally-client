import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import { Nav } from "./components/nav/Nav";
import { UserView } from "./views/UserView";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<UserView />} />
      </Routes>
    </>
  );
};

export default App;
