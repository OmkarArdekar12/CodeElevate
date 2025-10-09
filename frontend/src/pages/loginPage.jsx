import React, { use } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useSession();

  const handleLoginSuccess = (userData) => {
    console.log("The logged in userData: ", userData);
    login(userData);
    if (!userData.isMfaActive) {
      navigate("/setup-2fa");
    } else {
      navigate("/verify-2fa");
    }
  };

  return (
    <div className="w-[100%] h-[100%] text-white bg-slate-900 flex flex-col justify-center items-center px-5 py-9 transition-all duration-300 ease-in-out">
      <div className="inline-flex justify-center items-center mb-5">
        <img src="/images/Logo.gif" alt="CodeElevate" className="h-25 mr-1" />
        <h1 className="logo-text ml-1 text-white text-4xl">CodeElevate</h1>
      </div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
