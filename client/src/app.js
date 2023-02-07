import React from "react";

import SignUp from "./components/User/SignUp";
import SignIn from "./components/User/SignIn";
import Admin from "./components/User/AdminDashboard"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<SignIn />} exact />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/admin" element={<Admin />} />
        <Route element={Error} />
      </Routes>
    </main>
  );
}

export default App;