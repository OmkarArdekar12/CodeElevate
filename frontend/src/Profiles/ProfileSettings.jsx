import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { logoutUser } from "../service/authApi.js";
import { useSession } from "../context/SessionContext";
import { FaSignOutAlt as LogoutIcon } from "react-icons/fa";
import { FaUserTimes as DeleteIcon } from "react-icons/fa";

const ProfileSettings = () => {
  const { id: profileId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useSession();
  const userId = user && user.userId ? user.userId : "";
  const isOwner = profileId === userId;
  const isAuthorized = isLoggedIn && isOwner;
  // const { state } = useLocation();
  // const userId = state?.profileUserId ?? profileUserId;
  // const isAuthorized = state?.isAuthorized;

  const handleLogout = async () => {
    try {
      const { data } = await logoutUser();
      logout(data);
      navigate("/login");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="text-white w-full px-3 py-5 flex flex-col items-center justify-center">
        <p className="opacity-80">Not authorized.</p>
      </div>
    );
  }

  return (
    <div className="text-white w-full px-3 py-5 flex flex-col items-center justify-center">
      {isAuthorized && (
        <button
          className="flex items-center justify-center bg-red-500 text-center rounded-md px-4 py-2 hover-text-border w-[90%] md:w-[50%] my-2 text-xl hover:bg-red-700"
          onClick={handleLogout}
        >
          <LogoutIcon className="inline mr-2" size={25} />
          Logout
        </button>
      )}
      {isAuthorized && (
        <button
          className="flex items-center justify-center bg-red-500 text-center rounded-md px-4 py-2 hover-text-border w-[90%] md:w-[50%] my-2 text-xl hover:bg-red-700"
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
