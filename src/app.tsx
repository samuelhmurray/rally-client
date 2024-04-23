import React from "react";
// import { UserViews } from "./views/UserViews.js";
import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/nav/Nav";
// import { Login } from "./components/login/Login.js";


export const App = () => {
  return (<><Nav/>
  <div><h2 className="bg-slate-600">hello</h2></div></>
//       <Route path="/login" element={<Login />} />
//       <Route path="*" element={<UserViews />} />
//     </Routes>
  );
};

export default App;