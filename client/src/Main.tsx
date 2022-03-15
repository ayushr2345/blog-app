import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Forms/Login";
import Home from "./components/Home/Home";
import Pitch from "./components/Home/Pitch";

function Main() {
  return (
    <div>
      <Home />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pitch />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Main;
