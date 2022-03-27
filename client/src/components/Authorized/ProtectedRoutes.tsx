import React, { FC, useEffect, useLayoutEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MatchAUserSession } from "../../services/userService";

type Props = {
  isLoggedIn: boolean;
};

const ProtectedRoutes: FC<Props> = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
