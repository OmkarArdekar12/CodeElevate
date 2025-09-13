import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useSession();
  console.log("The LoggedIn: ", isLoggedIn);
  if (loading) {
    return (
      <div className="w-[100%] h-[100%] text-white bg-slate-900 flex flex-col justify-center items-center px-5 py-9">
        Loading...
      </div>
    );
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
