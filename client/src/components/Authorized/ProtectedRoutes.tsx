import React, { FC } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Home from "../Home/Home";
import Dashboard from "./Dashboard";

type Props = {
  isAuth: boolean;
};

const ProtectedRoutes: FC<Props> = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
