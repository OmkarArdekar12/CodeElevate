import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";
import Loading from "./Loading.jsx";
import toast from "react-hot-toast";

const PrivateRoute = () => {
  const { isLoggedIn, isVerified, loading } = useSession();
  if (loading) {
    return <Loading />;
  }
  if (isLoggedIn && !isVerified) {
    return <Navigate to="/verify-2fa" replace />;
  }
  return isLoggedIn && isVerified ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
