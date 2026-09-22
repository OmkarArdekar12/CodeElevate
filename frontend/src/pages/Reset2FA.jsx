import React from "react";
import { useNavigate } from "react-router-dom";
import EmailOtpForm from "../components/EmailOtpForm.jsx";

const Reset2FA = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[100%] h-[100%] text-white bg-slate-950 flex flex-col justify-center items-center px-5 py-9 transition-all duration-300 ease-in-out">
      <div className="inline-flex justify-center items-center mb-5">
        <img
          src="/images/CodeElevateLogo.gif"
          alt="CodeElevate"
          className="h-25 mr-1"
        />
        <h1 className="logo-text ml-1 text-white text-4xl">CodeElevate</h1>
      </div>
      <EmailOtpForm
        purpose="reset"
        askEmail={false}
        title="Reset Two-Factor Authentication"
        description="We'll send a 6-digit code to the email linked to your account."
        onVerified={() => navigate("/setup-2fa")}
        onBack={() => navigate("/verify-2fa")}
      />
    </div>
  );
};

export default Reset2FA;
