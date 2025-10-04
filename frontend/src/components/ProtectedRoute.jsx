import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import Loading from "./Loading";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useSession();
  console.log("The LoggedIn: ", isLoggedIn);
  if (loading) {
    return <Loading />;
  }
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <>
      {toast.error("You must be logged-in to access that.", {
        id: "Unauthorized Access",
      })}
      <Navigate to="/login" replace />
    </>
  );
};

export default ProtectedRoute;
