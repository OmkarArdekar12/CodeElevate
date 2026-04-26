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
import Loading from "../components/Loading.jsx";
import { deleteProfile, getUserData } from "../service/profileApi.js";
import { sendEmailOtp, verifyEmailOtp } from "../service/authApi.js";

const ProfileSettings = () => {
  const { id: profileId } = useParams();
  const navigate = useNavigate();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [userProfileData, setUserProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, isVerified, isMfaActive, user, logout, updateMfaStatus } =
    useSession();
  const userId = user && user.userId ? user.userId : "";
  const isOwner = profileId === userId;
  const isAuthorized = isLoggedIn && isVerified && isOwner;

  const [mfaStep, setMfaStep] = useState(0); // 0=idle, 1=email input, 2=otp input
  const [mfaEmail, setMfaEmail] = useState("");
  const [mfaOtp, setMfaOtp] = useState("");
  const [mfaLoading, setMfaLoading] = useState(false);
  const [mfaError, setMfaError] = useState("");
  const [mfaMessage, setMfaMessage] = useState("");

  const notAuth = !isAuthorized;

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const profileData = await getUserData(profileId);
      setUserProfileData(profileData);
    } catch (err) {
      setUserProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notAuth) {
      toast.error("Not authorized.", {
        id: "Invalid user to access profile settings",
      });
    } else {
      fetchUserProfile();
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
      //console.log("Error: ", err.message);
      toast.error("Failed to logout!, Please try again.", {
        id: "logout failed",
      });
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeletePopup(false);
    setDeleteLoading(true);
    try {
      const data = await deleteProfile(profileId);
      toast.success("User profile deleted successfully.", {
        id: "user profile delete success",
      });
      logout(true);
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Failed to delete account.", {
        id: "user profile delete failed",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEnableMfa = () => {
    setMfaError("");
    setMfaMessage("");
    const existingEmail = userProfileData?.socials?.email || "";
    setMfaEmail(existingEmail);
    setMfaStep(1);
  };

  const handleSendMfaOtp = async () => {
    if (!mfaEmail) {
      setMfaError("Please enter your email.");
      return;
    }
    setMfaLoading(true);
    setMfaError("");
    try {
      await sendEmailOtp(mfaEmail);
      setMfaStep(2);
      setMfaMessage("OTP sent to your email.");
      toast.success("OTP sent!", { id: "mfa otp sent" });
    } catch (err) {
      setMfaError(err?.response?.data?.message || "Failed to send OTP.");
      toast.error("Failed to send OTP!", { id: "mfa otp failed" });
    } finally {
      setMfaLoading(false);
    }
  };

  const handleVerifyMfaOtp = async () => {
    if (!mfaOtp) {
      setMfaError("Please enter the OTP.");
      return;
    }
    setMfaLoading(true);
    setMfaError("");
    try {
      await verifyEmailOtp(mfaOtp);
      setMfaStep(0);
      setMfaOtp("");
      toast.success("Email verified! Setting up 2FA...", {
        id: "mfa email verified",
      });
      navigate("/setup-2fa");
    } catch (err) {
      setMfaOtp("");
      setMfaError(err?.response?.data?.message || "Invalid or expired OTP.");
      toast.error("OTP verification failed!", { id: "mfa otp verify failed" });
    } finally {
      setMfaLoading(false);
    }
  };

  const handleCancelMfa = () => {
    setMfaStep(0);
    setMfaEmail("");
    setMfaOtp("");
    setMfaError("");
    setMfaMessage("");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="text-white w-full px-3 py-5 flex flex-col items-center justify-center transition-all duration-300 ease-in-out">
      {isAuthorized && userProfileData && (
        <div className="flex flex-col justify-center gap-3 w-[90%] md:w-[50%] my-2 border-b">
          <h1 className="text-2xl title-font">Account Information</h1>
          <div className="w-full text-lg pt-4 pb-6 sm:px-4 flex flex-col justify-center gap-1 title-font">
            <div className="flex flex-wrap justify-center items-center gap-3 py-2 pb-3">
              <div className="flex justify-center items-center">
                <img
                  src={
                    userProfileData.profilePicture ||
                    "/images/defaultUserImage.png"
                  }
                  alt="ProfilePicture"
                  className="size-25 border-2 rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center">
                  Full Name: &nbsp;<span>{userProfileData.fullName}</span>
                </div>
                <div className="flex flex-wrap items-center">
                  Username: &nbsp;
                  <span className="italic">{userProfileData.username}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <span className="text-left">Account Status:</span>
              <span className="text-green-500 text-right">&#x25CF; Active</span>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <span className="text-left">Last updated:</span>
              <span className="text-right">
                {new Date(userProfileData.updatedAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  },
                )}{" "}
                {new Date(userProfileData.updatedAt).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  },
                )}
              </span>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <span className="text-left">Member Since:</span>
              <span className="text-right">
                {new Date(userProfileData.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  },
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center">
            <span className="text-left">Two-Factor Auth (2FA):</span>
            <span
              className={
                isMfaActive
                  ? "text-green-500 text-right"
                  : "text-gray-400 text-right"
              }
            >
              {isMfaActive ? "● Enabled" : "○ Disabled"}
            </span>
          </div>

          {!isMfaActive && mfaStep === 0 && (
            <button
              onClick={handleEnableMfa}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer text-base"
            >
              Enable 2FA
            </button>
          )}
          {!isMfaActive && mfaStep === 1 && (
            <div className="mt-2 flex flex-col gap-2">
              <label className="text-sm text-gray-300">
                {userProfileData?.socials?.email
                  ? "Verify your email to continue:"
                  : "Enter your email to set up 2FA:"}
              </label>
              <input
                type="email"
                value={mfaEmail}
                onChange={(e) => setMfaEmail(e.target.value)}
                className="w-full p-2 border rounded text-black"
                placeholder="Enter your email"
              />
              {mfaError && <p className="text-red-400 text-sm">{mfaError}</p>}
              <div className="flex gap-2">
                <button
                  onClick={handleSendMfaOtp}
                  disabled={mfaLoading}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 cursor-pointer disabled:opacity-60"
                >
                  {mfaLoading ? "Sending..." : "Send OTP"}
                </button>
                <button
                  onClick={handleCancelMfa}
                  className="flex-1 bg-slate-600 text-white py-2 rounded-md hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {!isMfaActive && mfaStep === 2 && (
            <div className="mt-2 flex flex-col gap-2">
              {mfaMessage && (
                <p className="text-green-400 text-sm">{mfaMessage}</p>
              )}
              <label className="text-sm text-gray-300">
                Enter OTP from your email:
              </label>
              <input
                type="text"
                value={mfaOtp}
                onChange={(e) => setMfaOtp(e.target.value)}
                className="w-full p-2 border rounded text-black"
                placeholder="6-digit OTP"
              />
              {mfaError && <p className="text-red-400 text-sm">{mfaError}</p>}
              <div className="flex gap-2">
                <button
                  onClick={handleVerifyMfaOtp}
                  disabled={mfaLoading}
                  className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 cursor-pointer disabled:opacity-60"
                >
                  {mfaLoading ? "Verifying..." : "Verify & Enable 2FA"}
                </button>
                <button
                  onClick={handleCancelMfa}
                  className="flex-1 bg-slate-600 text-white py-2 rounded-md hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {isAuthorized && (
        <button
          className={`flex items-center justify-center text-center rounded-md px-4 py-2 hover-text-border w-[90%] md:w-[50%] my-2 text-xl ${
            logoutLoading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-700 cursor-pointer"
          }`}
          onClick={handleLogout}
          disabled={logoutLoading || deleteLoading}
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
          className={`flex items-center justify-center text-center rounded-md px-4 py-2 hover-text-border w-[90%] md:w-[50%] my-2 text-xl ${
            deleteLoading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-700 cursor-pointer"
          }`}
          onClick={() => setShowDeletePopup(true)}
          disabled={deleteLoading || logoutLoading}
        >
          {deleteLoading ? (
            <Loading2 text="Deleting account..." />
          ) : (
            <>
              <DeleteIcon className="inline mr-2" size={25} />
              Delete Account
            </>
          )}
        </button>
      )}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-2xl mb-4 font-semibold text-red-500">
              Delete Account
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to permanently delete your account? <br />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="px-5 py-2 rounded-md bg-gray-600 hover:bg-gray-700 transition"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className={`px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 transition ${
                  deleteLoading ? "cursor-not-allowed opacity-70" : ""
                }`}
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
