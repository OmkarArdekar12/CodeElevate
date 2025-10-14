import React, { useState, useEffect } from "react";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { logoutUser } from "../service/authApi.js";
import { useSession } from "../context/SessionContext.jsx";
import { FaSignOutAlt as LogoutIcon } from "react-icons/fa";
import { FaUserTimes as DeleteIcon } from "react-icons/fa";
import toast from "react-hot-toast";
import Loading2 from "../components/Loading2.jsx";

const ProfileSettings = () => {
  const { id: profileId } = useParams();
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { isLoggedIn, isVerified, user, logout } = useSession();
  const userId = user && user.userId ? user.userId : "";
  const isOwner = profileId === userId;
  const isAuthorized = isLoggedIn && isVerified && isOwner;
  // const { state } = useLocation();
  // const userId = state?.profileUserId ?? profileUserId;
  // const isAuthorized = state?.isAuthorized;

  const notAuth = !isAuthorized;
  useEffect(() => {
    if (notAuth) {
      toast.error("Not authorized.", {
        id: "Invalid user to access profile settings",
      });
    }
  }, [notAuth]);

  if (notAuth) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const { data } = await logoutUser();
      logout(data);
      navigate("/login");
      toast.success("You've been logged out. See you soon!", { id: "logout" });
    } catch (err) {
      console.log("Error: ", err.message);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="text-white w-full px-3 py-5 flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
      {isAuthorized && (
        <button
          className={`flex items-center justify-center text-center rounded-md px-4 py-2 hover-text-border w-[90%] md:w-[50%] my-2 text-xl ${
            logoutLoading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-700 cursor-pointer"
          }`}
          onClick={handleLogout}
          disabled={logoutLoading}
        >
          {logoutLoading ? (
            <Loading2 text="Logging out..." />
          ) : (
            <>
              <LogoutIcon className="inline mr-2" size={25} />
              Logout
            </>
          )}
        </button>
      )}
      {isAuthorized && (
        <button
          className="flex items-center justify-center bg-red-500 text-center rounded-md px-4 py-2 hover-text-border w-[90%] md:w-[50%] my-2 text-xl hover:bg-red-700 cursor-pointer"
          //   onClick={handleLogout}
        >
          <DeleteIcon className="inline mr-2" size={25} />
          Delete Account
        </button>
      )}
    </div>
  );
};

export default ProfileSettings;
