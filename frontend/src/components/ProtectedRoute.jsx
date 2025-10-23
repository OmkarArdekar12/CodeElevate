import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";
import Loading from "./Loading.jsx";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useSession();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      toast.error("You need to be logged in to access that!", {
        id: "proctected route login",
      });
    }
  }, [loading, isLoggedIn]);

  if (loading) {
    return <Loading />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
