import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { Routes, Route, useOutletContext, Outlet } from "react-router-dom";
import Login from "./components/Forms/Login";
import Signup from "./components/Forms/Signup";
import About from "./components/Constants/About";
import Contact from "./components/Constants/Contact";
import Dashboard from "./components/Authorized/Dashboard";
import ProtectedRoutes from "./components/Authorized/ProtectedRoutes";
import ProtectedLoginRoutes from "./components/Authorized/ProtectedLoginRoute";
import ProtectedSignupRoutes from "./components/Authorized/ProtectedSignupRoute";
import IUser from "./interfaces/User.interface";

function App() {
  const [user, setUser] = useState<Partial<IUser>>({
    name: "Ayuauasdbf",
    email: "",
  });
  const usera = useOutletContext();
  //console.log(useOutletContext());
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        {/* Protected Routes for Login */}
        <Route path="login" element={<ProtectedLoginRoutes />}>
          <Route path="" element={<Login />} />
        </Route>

        {/* Protected Routes for Signup */}
        <Route path="signup" element={<ProtectedSignupRoutes />}>
          <Route path="" element={<Signup />} />
        </Route>

        {/* Protected Routes for dashboard */}
        <Route path="auth/dashboard" element={<ProtectedRoutes />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        {/* Protected Routes for dashboard ends */}
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
