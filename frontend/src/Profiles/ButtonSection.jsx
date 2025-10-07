import React, { useEffect, useState } from "react";
import { FaUserEdit, FaEdit } from "react-icons/fa";
import { FaCog as SettingsIcon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import { FaUserAltSlash } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import {
  checkConnectionStatus,
  connectRequest,
  followUser,
  unconnectUser,
  unfollowUser,
} from "../service/connectionApi";
import toast from "react-hot-toast";
import Loading2 from "../components/Loading2.jsx";

const ButtonSection = ({
  profileUserId,
  isLoggedIn,
  isOwner,
  profileUserFullName,
  followersCount,
  followingCount,
}) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [connectStatus, setConnectStatus] = useState("none");
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [loadingConnect, setLoadingConnect] = useState(false);

  const fetchStatus = async () => {
    try {
      const data = await checkConnectionStatus(profileUserId);
      setIsFollowing(data.followStatus);
      setConnectStatus(data.connectStatus);
    } catch (err) {
      console.error(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && !isOwner) {
      fetchStatus();
    }
  }, [profileUserId, isLoggedIn, isOwner]);

  const handleFollow = async () => {
    setLoadingFollow(true);
    try {
      if (!isFollowing) {
        //follow
        const response = await followUser(profileUserId);
        setIsFollowing(true);
        toast.success(`You started following ${profileUserFullName}.`);
      } else {
        //unfollow
        const response = await unfollowUser(profileUserId);
        setIsFollowing(false);
        toast.success(`You unfollowed ${profileUserFullName}.`);
      }
      fetchStatus(); //updating status
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message);
    } finally {
      setLoadingFollow(false);
    }
  };

  const handleConnect = async () => {
    setLoadingConnect(true);
    try {
      if (connectStatus === "none" || connectStatus == "not_connected") {
        //send connection request
        const response = await connectRequest(profileUserId);
        toast.success(`Connection request send to ${profileUserFullName}.`);
        setConnectStatus("pending");
      } else if (connectStatus == "pending") {
        //connection request already send - toast message
        toast("Connection request already send!");
      } else if (connectStatus == "connected") {
        //unconnect connection
        const response = await unconnectUser(profileUserId);
        toast.success(`You disconnected from ${profileUserFullName}.`);
        setConnectStatus("not_connected");
      } else {
        toast.error("Invalid connected state");
      }
      fetchStatus(); //refreshing status
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message);
    } finally {
      setLoadingConnect(false);
    }
  };

  return (
    <>
      <div className="w-full mt-4 inline-flex flex-wrap items-center justify-center md:justify-start pl-1 md:pl-25 transition-all duration-300 ease-in-out">
        <div className="w-full pt-1 pb-4 flex flex-col justify-center md:flex-row md:justify-between mb-2">
          <div className="flex flex-col justify-center pl-1">
            {(followersCount > 0 || followingCount > 0) && (
              <div className="flex flex-wrap items-center">
                <span className="mr-2 text-lg md:py-2 sm:px-4 hover-text-border">
                  {followersCount.toLocaleString()} followers
                </span>
                <span className="text-sm md:py-2 hover-text-border">
                  {followingCount.toLocaleString()} following
                </span>
              </div>
            )}
            <div className="flex items-center">
              <button
                onClick={() =>
                  navigate(`/profiles/${profileUserId}/connections`)
                }
                className="md:py-1 sm:px-4 text-gray-400 hover:text-blue-600 hover:underline cursor-pointer group"
              >
                See connections
                <FaLongArrowAltRight
                  className="ml-1 hidden group-hover:inline"
                  size={15}
                />
              </button>
            </div>
          </div>
          {isLoggedIn && isOwner && (
            <div className="px-1 md:ml-auto pr-2 md:pr-10 flex flex-wrap flex-col items-end justify-center">
              <div className="flex flex-wrap items-center">
                <button
                  className="mt-2 md:mt-0 group mr-2 text-black bg-teal-500 hover:bg-teal-700 px-6 py-2 text-md md:text-xl rounded-2xl flex items-center hover-text-border cursor-pointer border-1"
                  onClick={() => navigate(`/profiles/${profileUserId}/edit`)}
                >
                  <FaEdit
                    className="inline text-black mr-1 group-hover:text-white"
                    size={20}
                  />
                  Edit Profile
                </button>
                <button
                  className="mt-2 md:mt-0 group text-black bg-teal-500 hover:bg-teal-700 px-6 py-2 text-md md:text-xl rounded-2xl flex items-center hover-text-border cursor-pointer border-1"
                  onClick={() =>
                    navigate(`/profiles/${profileUserId}/settings`)
                  }
                >
                  <SettingsIcon
                    className="inline text-black mr-1 group-hover:text-white"
                    size={20}
                  />
                  Settings
                </button>
              </div>
              <button
                className="mt-2 group text-white px-6 py-2 text-md md:text-xl rounded-2xl flex items-center hover-text-border cursor-pointer border-1 hover:border-2"
                onClick={() =>
                  navigate(`/posts/create`, {
                    state: { from: window.location.pathname },
                  })
                }
              >
                <IoAddCircle
                  className="inline text-white mr-1 group-hover:border-1 rounded-full"
                  size={25}
                />
                Create a Post
              </button>
              {/* <button
              className="group text-black bg-teal-500 hover:bg-teal-700 px-6 py-2 text-xl rounded-2xl flex items-center hover-text-border cursor-pointer border-1"
              onClick={() =>
                navigate(`/profiles/${profileUserId}/settings`, {
                  state: {
                    profileUserId,
                    from: "profile",
                    isAuthorized: isLoggedIn && isOwner,
                  },
                  replace: false,
                })
              }
            >
              <SettingsIcon
                className="inline text-black mr-1 group-hover:text-white"
                size={20}
              />
              Settings
            </button> */}
            </div>
          )}
        </div>
        {!isOwner && isLoggedIn && (
          <div className="w-full flex items-center flex-wrap pl-1">
            <button
              onClick={handleFollow}
              disabled={loadingFollow}
              className={`flex items-center py-2 px-4 m-1 rounded-md hover:text-white hover-text-border  ${
                loadingFollow
                  ? "bg-gray-700 cursor-not-allowed"
                  : isFollowing
                  ? "bg-gray-600 hover:bg-gray-700 cursor-pointer"
                  : "bg-blue-500 hover:border-1 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 cursor-pointer"
              }`}
            >
              {!isFollowing ? (
                <FaUserPlus className="inline mr-1" size={20} />
              ) : (
                <FaUserMinus className="inline mr-1" size={20} />
              )}
              {loadingFollow ? (
                <Loading2 text="following..." />
              ) : isFollowing ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </button>
            <button
              onClick={handleConnect}
              disabled={loadingConnect || connectStatus === "pending"}
              className={`flex items-center py-2 px-4 m-1 rounded-md hover:text-white hover-text-border  ${
                loadingConnect
                  ? "bg-gray-700 cursor-not-allowed"
                  : connectStatus === "connected"
                  ? "bg-gray-600 hover:bg-gray-700 cursor-pointer"
                  : connectStatus === "pending"
                  ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:border-1 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 cursor-pointer"
              }`}
            >
              {loadingConnect ? (
                <>
                  <FaUserClock className="inline mr-1" size={20} />
                  <Loading2 text="connecting..." />
                </>
              ) : connectStatus === "connected" ? (
                <>
                  <FaUserAltSlash className="inline mr-1" size={20} />
                  Disconnect
                </>
              ) : connectStatus === "pending" ? (
                <>
                  <FaClockRotateLeft className="inline mr-1" size={20} />
                  Pending
                </>
              ) : (
                <>
                  <FaUserClock className="inline mr-1" size={20} />
                  Connect
                </>
              )}
            </button>
            <button className="flex items-center bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover:border-blue-500 hover-text-border hover:bg-gradient-to-l hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 cursor-pointer">
              <MdMessage className="inline mr-1" size={20} />
              Message
            </button>
          </div>
        )}
      </div>
      <hr className="w-full text-gray-600 mt-20 mb-10" />
    </>
  );
};

export default ButtonSection;
