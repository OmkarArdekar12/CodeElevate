import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-[100%] h-[100%] text-white bg-slate-900 flex flex-col justify-center items-center px-5 py-9">
      <div className="logo-container inline-flex justify-center items-center mb-5">
        <img src="/images/logo.png" alt="CodeElevate" className="logo h-25" />
        <h1 className="logo-text ml-1 text-white text-4xl">CodeElevate</h1>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
