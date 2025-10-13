import React from "react";
import TwoFAVerification from "../components/TwoFAVerification";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSession } from "../context/SessionContext";

const Verify2FA = () => {
  const navigate = useNavigate();
  const { verify } = useSession();

  const handleVerification = async (data) => {
    if (data) {
      navigate("/");
      verify();
      setTimeout(() => {
        toast.dismiss();
        toast.success("You're now logged in.", { id: "login success" });
      }, 500);
    }
  };

  const handle2FAReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };

  return (
    <div className="w-[100%] h-[100%] text-white bg-slate-950 flex flex-col justify-center items-center px-10 py-9 transition-all duration-300 ease-in-out">
      <div className="inline-flex justify-center items-center mb-5">
        <img
          src="/images/CodeElevateLogo.gif"
          alt="CodeElevate"
          className="h-25 mr-1"
        />
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
