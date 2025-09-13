import React from "react";
import TwoFAVerification from "../components/TwoFAVerification";
import { useNavigate } from "react-router-dom";

const Verify2FA = () => {
  const navigate = useNavigate();

  const handleVerification = async (data) => {
    if (data) {
      navigate("/");
    }
  };

  const handle2FAReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };

  return (
    <div className="w-[100%] h-[100%] text-white bg-slate-900 flex flex-col justify-center items-center px-10 py-9">
      <div className="logo-container inline-flex justify-center items-center mb-5">
        <img src="/images/logo.png" alt="CodeElevate" className="logo h-25" />
        <h1 className="logo-text ml-1 text-white text-4xl">CodeElevate</h1>
      </div>
      <TwoFAVerification
        onVerifySuccess={handleVerification}
        onResetSuccess={handle2FAReset}
      />
    </div>
  );
};

export default Verify2FA;
