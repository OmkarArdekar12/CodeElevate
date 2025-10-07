import { useState } from "react";
import { Link } from "react-router-dom";
import { showProfile } from "../service/profileApi";
import { useEffect } from "react";
import { FaHome as HomeIcon } from "react-icons/fa";
import { IoMdPhotos as PostsIcon } from "react-icons/io";
import { FaBell as NotificationsIcon } from "react-icons/fa";
import { BiSolidMessageSquareDetail as MessagesIcon } from "react-icons/bi";
import { FaTrophy as RankingsIcon } from "react-icons/fa";
import { FaInfoCircle as AboutIcon } from "react-icons/fa";
import { FaUser as UserIcon } from "react-icons/fa";
import { FaSignInAlt as LoginIcon } from "react-icons/fa";

export default function Navbar({ isLoggedIn, userData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userImage, setUserImage] = useState("/images/defaultUserImage.png");

  const fetchCurrentUser = async () => {
    try {
      const currUser = await showProfile(userData.userId);
      if (currUser.profilePicture) {
        setUserImage(currUser.profilePicture);
      }
    } catch (err) {
      setUserImage("/images/defaultUserImage.png");
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData && userData.userId) {
      fetchCurrentUser();
    }
  }, [isLoggedIn, userData]);

  return (
    <header className="bg-gray-800 w-[100%]">
      <nav className="bg-gray-800 shadow-lg w-[100%] py-3">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <Link to="/">
              <div className="logo-container flex-shrink-0 flex items-center">
                <img
                  src="/images/CodeElevateLogo.png"
                  alt="CodeElevate"
                  className="logo h-18 mr-1"
                />
                <h1 className="LogoText logo-text ml-1 text-white text-3xl hover-logo-text-border">
                  CodeElevate
                </h1>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="flex items-center">
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/"
                  className="flex flex-col items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150 hover:font-bold"
                >
                  <HomeIcon className="text-2xl" />
                  Home
                </Link>
                <Link
                  to="/posts"
                  className="flex flex-col items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150 hover:font-bold"
                >
                  <PostsIcon className="text-xl" />
                  Posts
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/notifications"
                    className="flex flex-col items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150 hover:font-bold"
                  >
                    <NotificationsIcon className="text-xl" />
                    Notifications
                  </Link>
                )}
                {isLoggedIn && (
                  <Link
                    to="/messages"
                    className="flex flex-col items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150 hover:font-bold"
                  >
                    <MessagesIcon className="text-xl" />
                    Messages
                  </Link>
                )}
                <Link
                  to="/rankings"
                  className="flex flex-col items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150 hover:font-bold"
                >
                  <RankingsIcon className="text-xl" />
                  Rankings
                </Link>
                <Link
                  to="/about"
                  className="flex flex-col items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150 hover:font-bold"
                >
                  <AboutIcon className="text-xl" />
                  About
                </Link>
              </div>

              {isLoggedIn ? (
                <div className="flex items-center ml-4">
                  <Link
                    to={
                      userData && userData.userId
                        ? `/profiles/${userData.userId}`
                        : "/"
                    }
                    className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150"
                  >
                    <div className="hidden md:block">
                      <img
                        src={userImage}
                        alt="ProfileImage"
                        className="h-14 w-14 rounded-full object-cover border-1"
                      />
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center ml-4">
                  <Link
                    to="/login"
                    className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150"
                  >
                    <div className="hidden md:block">
                      <button className="flex items-center text-white bg-green-700 hover:bg-green-600 p-2 rounded-md cursor-pointer hover-text-border">
                        <LoginIcon className="inline mr-2" />
                        Login / SignUp
                      </button>
                    </div>
                  </Link>
                </div>
              )}

              {/* Menu button Navbar */}
              <div className="lg:hidden flex items-center ml-2">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition duration-150"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isLoggedIn ? (
                <Link
                  to={
                    userData && userData.userId
                      ? `/profiles/${userData.userId}`
                      : "/"
                  }
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 md:hidden hover:font-semibold"
                >
                  <UserIcon className="mr-2" />
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-green-500 hover:underline hover:bg-gray-700 transition duration-150 md:hidden hover:font-extrabold"
                >
                  <LoginIcon className="inline mr-2" />
                  Login / Signup
                </Link>
              )}
              <Link
                to="/"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 hover:font-bold"
              >
                <HomeIcon className="mr-2" />
                Home
              </Link>
              <Link
                to="/posts"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 hover:font-bold"
              >
                <PostsIcon className="mr-2" />
                Posts
              </Link>
              {isLoggedIn && (
                <Link
                  to="/notifications"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 hover:font-bold"
                >
                  <NotificationsIcon className="mr-2" />
                  Notifications
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to="/messages"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 hover:font-bold"
                >
                  <MessagesIcon className="mr-2" />
                  Messages
                </Link>
              )}
              <Link
                to="/rankings"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 hover:font-bold"
              >
                <RankingsIcon className="mr-2" />
                Rankings
              </Link>
              <Link
                to="/about"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 hover:font-bold"
              >
                <AboutIcon className="mr-2" />
                About
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
