import React from "react";
import TwoFASetup from "../components/TwoFASetup.jsx";
import { useNavigate } from "react-router-dom";

const Setup2FA = () => {
  const navigate = useNavigate();
  const handleSetupComplete = () => {
    navigate("/verify-2fa");
  };
  return (
    <div className="w-[100%] h-[100%] text-white bg-slate-950 flex flex-col justify-center items-center px-5 py-9 transition-all duration-300 ease-in-out">
      <div className="inline-flex justify-center items-center mb-1">
        <img
          src="/images/CodeElevateLogo.gif"
          alt="CodeElevate"
          className="h-10"
        />
        <h1 className="logo-text ml-1 text-white text-3xl">CodeElevate</h1>
      </div>
      <TwoFASetup onSetupComplete={handleSetupComplete} />
    </div>
  );
};

export default Setup2FA;
