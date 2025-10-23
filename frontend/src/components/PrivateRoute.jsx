import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";
import Loading from "./Loading.jsx";
import toast from "react-hot-toast";

const PrivateRoute = () => {
  const { isLoggedIn, isVerified, loading } = useSession();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        toast.error("You need to be logged in to access that!", {
          id: "private route login",
        });
      } else if (!isVerified) {
        toast.error("You need to verify your account to continue!", {
          id: "private route verify",
        });
      }
    }
  }, [loading, isLoggedIn, isVerified]);

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
