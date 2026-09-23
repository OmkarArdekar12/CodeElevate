import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";
import Loading from "./Loading.jsx";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useSession();

  if (loading) {
    return <Loading />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
