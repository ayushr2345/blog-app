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
import { MatchAUserSession } from "./services/userService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  MatchAUserSession().then((res) => {
    setIsLoggedIn(res);
  });
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes for Login
        <Route path="/login" element={<ProtectedLoginRoutes />}>
          <Route path="" element={<Login />} />
        </Route> */}

        {/* Protected Routes for Signup
        <Route path="/signup" element={<ProtectedSignupRoutes />}>
          <Route path="" element={<Signup />} />
        </Route> */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/auth/dashboard"
          element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}
        >
          <Route path="" element={<Dashboard />} />
        </Route>

        {/* Protected Routes for dashboard
        <Route
          path="/auth/dashboard"
          element={<ProtectedRoutes isLoggedIn={sessionMatch} />}
        >
          <Route path="" element={<Dashboard />} />
        </Route> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
