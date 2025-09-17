import { useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useSession();

  return (
    <nav className="bg-gray-800 shadow-lg w-[100%] py-3">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link to="/">
            <div className="logo-container flex-shrink-0 flex items-center">
              <img
                src="/images/logo.png"
                alt="CodeElevate"
                className="logo h-18"
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
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150"
              >
                Home
              </Link>
              <Link
                to="/posts"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150"
              >
                Posts
              </Link>
              {isLoggedIn && (
                <Link
                  to="/notifications"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150"
                >
                  Notifications
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to="/messages"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150"
                >
                  Messages
                </Link>
              )}
              <Link
                to="/rankings"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150"
              >
                Rankings
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150"
              >
                About
              </Link>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center ml-4">
                <Link
                  to="#"
                  className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium transition duration-150"
                >
                  <div className="hidden md:block">
                    <img
                      src="/images/userImage.png"
                      alt="Profile"
                      className="h-12 w-12 rounded-full object-cover"
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
                    <button className="text-white bg-green-700 hover:bg-green-600 p-2 rounded-md">
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
                to="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150 md:hidden"
              >
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-green-500 hover:underline hover:bg-gray-700 transition duration-150 md:hidden"
              >
                Login / Signup
              </Link>
            )}
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150"
            >
              Home
            </Link>
            <Link
              to="/posts"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150"
            >
              Posts
            </Link>
            {isLoggedIn && (
              <Link
                to="/notifications"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150"
              >
                Notifications
              </Link>
            )}
            {isLoggedIn && (
              <Link
                to="/messages"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150"
              >
                Messages
              </Link>
            )}
            <Link
              to="/rankings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150"
            >
              Rankings
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-150"
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
