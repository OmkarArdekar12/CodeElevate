import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext.jsx";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useSession();
  const location = useLocation();
  const [logoSource, setLogoSource] = useState("");

  useEffect(() => {
    const timestamp = new Date().getTime();
    setLogoSource(`/images/CodeElevateLogo.gif?t=${timestamp}`);
  }, [location.pathname]);

  const handleLoginSuccess = (userData) => {
    // console.log("The logged in userData: ", userData);
    login(userData);
    if (!userData.isMfaActive) {
      navigate("/setup-2fa");
    } else {
      navigate("/verify-2fa");
    }
  };

  return (
    <div className="w-[100%] h-[100%] text-white bg-slate-900 flex flex-col justify-center items-center px-5 py-9 transition-all duration-300 ease-in-out">
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="inline-flex flex-col justify-center items-center mb-5 md:flex-row"
      >
        {logoSource && (
          <img
            key={logoSource}
            src={logoSource}
            alt="CodeElevate"
            className="h-25 mr-1"
          />
        )}
        <h1 className="logo-text ml-1 text-white text-3xl md:text-4xl">
          CodeElevate
        </h1>
      </motion.div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
