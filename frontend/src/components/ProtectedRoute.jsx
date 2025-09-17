import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import Loading from "./Loading";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useSession();
  console.log("The LoggedIn: ", isLoggedIn);
  if (loading) {
    return <Loading />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
