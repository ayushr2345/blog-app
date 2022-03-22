import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Forms/Login";
import Signup from "./components/Forms/Signup";
import About from "./components/Constants/About";
import Contact from "./components/Constants/Contact";
import Dashboard from "./components/Authorized/Dashboard";
import ProtectedRoutes from "./components/Authorized/ProtectedRoutes";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/auth/dashboard"
          element={<ProtectedRoutes isAuth={isAuth} />}
        >
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
