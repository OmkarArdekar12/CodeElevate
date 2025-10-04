import React, { useEffect, useState } from "react";
import { FaUserEdit, FaEdit } from "react-icons/fa";
import { FaCog as SettingsIcon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { SlUserFollow } from "react-icons/sl";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa6";
import {
  checkConnectionStatus,
  followUser,
  unfollowUser,
} from "../service/connectionApi";
import toast from "react-hot-toast";
import Loading2 from "../components/Loading2.jsx";

const ButtonSection = ({
  profileUserId,
  isLoggedIn,
  isOwner,
  profileUserFullName,
}) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [connectStatus, setConnectStatus] = useState(false);
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

  const handleConnect = async () => {};

  return (
    <>
      <div className="w-full mt-10 inline-flex flex-wrap items-center justify-center md:justify-start pl-1 md:pl-25">
        {!isOwner && isLoggedIn && (
          <button
            onClick={handleFollow}
            disabled={loadingFollow}
            className={`flex items-center py-2 px-4 m-1 rounded-md hover:text-white hover-text-border  ${
              loadingFollow
                ? "bg-gray-700 cursor-not-allowed"
                : isFollowing
                ? "bg-gray-600 cursor-pointer"
                : "bg-blue-500 hover:border-1 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 cursor-pointer"
            }`}
          >
            {!isFollowing ? (
              <FaUserPlus className="inline mr-1" size={20} />
            ) : (
              <FaUserMinus className="inline mr-1" size={20} />
            )}
            {loadingFollow ? (
              <Loading2 text="..." />
            ) : isFollowing ? (
              "Unfollow"
            ) : (
              "Follow"
            )}
          </button>
        )}
        <button className="flex items-center bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover:border-blue-500 hover-text-border hover:bg-gradient-to-l hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 cursor-pointer">
          <FaUserClock className="inline mr-1" size={20} />
          Connect
        </button>
        <button className="flex items-center bg-blue-500 py-2 px-4 m-1 rounded-md hover:text-white hover:border-1 hover:border-blue-500 hover-text-border hover:bg-gradient-to-l hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 cursor-pointer">
          <MdMessage className="inline mr-1" size={20} />
          Message
        </button>
        {isLoggedIn && isOwner && (
          <div className="pl-1 md:ml-auto mr-2 md:mr-10 flex flex-wrap items-center justify-center">
            <button
              className="mt-2 md:mt-0 group mr-2 text-black bg-teal-500 hover:bg-teal-700 px-6 py-2 text-xl rounded-2xl flex items-center hover-text-border cursor-pointer border-1"
              onClick={() => navigate(`/profiles/${profileUserId}/edit`)}
            >
              <FaEdit
                className="inline text-black mr-1 group-hover:text-white"
                size={20}
              />
              Edit
            </button>
            <button
              className="mt-1 md:mt-0 group text-black bg-teal-500 hover:bg-teal-700 px-6 py-2 text-xl rounded-2xl flex items-center hover-text-border cursor-pointer border-1"
              onClick={() => navigate(`/profiles/${profileUserId}/settings`)}
            >
              <SettingsIcon
                className="inline text-black mr-1 group-hover:text-white"
                size={20}
              />
              Settings
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
      <hr className="w-full text-gray-600 mt-25 mb-10" />
    </>
  );
};

export default ButtonSection;
