import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";
import Loading from "./Loading.jsx";
import toast from "react-hot-toast";

const PrivateRoute = () => {
  const { isLoggedIn, isVerified, isMfaActive, loading } = useSession();

  if (loading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isMfaActive && !isVerified) {
    return <Navigate to="/verify-2fa" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
