import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register, loginUser } from "../service/authApi";

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    setError("");
    setMessage("");
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      if (!username || !password || !confirmPassword) {
        throw new Error("All fields are required");
      }
      if (password !== confirmPassword) {
        throw new Error("Password and Confirm Password do not match");
      }
      const { data } = await register(username, password);
      setIsRegister(false);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      console.log("The error is: ", error.message);
      setError(error.message);
    }
  };

  const handleLogin = () => {};

  return (
    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="bg-white rounded-lg shadow-black-300 shadow-md w-full max-w-sm mx-auto text-black"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          {isRegister ? "Create Account" : "Login"}
        </h2>
      </div>
      <hr className="text-gray-200 mt-3 mb-3" />
      <p className="text-center text-gray-600 text-lg font-light">
        {isRegister
          ? "Looks like you are new here!"
          : "We are glad to see you again!"}
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="username" className="text-gray-600 text-sm">
            Username
          </label>
          <input
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter Your Username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-600 text-sm">
            Password
          </label>
          <input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter Your Password"
            required
          />
        </div>
        {isRegister && (
          <div className="mb-4">
            <label htmlFor="confirm-password" className="text-gray-600 text-sm">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded mt-2"
              placeholder="Enter Password Again"
              required
            />
          </div>
        )}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && (
          <p className="text-green-600 text-sm font-semibold mb-3">{message}</p>
        )}
        <button
          type="submit"
          className="w-full mt-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 hover-text-border"
        >
          {isRegister ? "Register" : "Login"}
        </button>
        <div>
          <p className="pt-3 text-center text-gray-600 text-sm">
            {isRegister
              ? "Already have an account? "
              : "Don't have an account? "}
            <Link
              to=""
              onClick={handleRegisterToggle}
              className="hover:text-blue-600"
            >
              {isRegister ? "Login" : "Create Account"}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
