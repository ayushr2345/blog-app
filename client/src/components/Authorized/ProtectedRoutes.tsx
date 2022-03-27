import React, { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  useOutlet,
  useOutletContext,
} from "react-router-dom";
import IUser from "../../interfaces/User.interface";
import { MatchAUserSession } from "../../services/userService";

function ProtectedRoutes() {
  const [user, setUser] = useState<Partial<IUser>>({
    name: "",
    email: "",
    dob: "",
  });
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    MatchAUserSession().then((res) => {
      if (res.user === null) {
        setIsLoggedIn(false);
        setLoading(false);
      } else {
        setIsLoggedIn(true);
        setLoading(false);
        //console.log(user);
        setUser(res.user);
        //console.log(user);
      }
    });
  }, []);

  if (isLoading) {
    return <>Loading</>;
  } else {
    if (isLoggedIn) {
      return <Outlet context={{ user }} />;
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export default ProtectedRoutes;
