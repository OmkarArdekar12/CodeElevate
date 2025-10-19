import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token2FA, setToken2FA] = useState(null);

  const expiryTime = 7 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    const expireCodeElevate = localStorage.getItem("expireCodeElevate");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedVerified = localStorage.getItem("isVerified") === "true";
    const stored2FAToken = localStorage.getItem("token2FA");
    // console.log("The useEffect runs: ", storedUser);
    if (expireCodeElevate && Date.now() < +expireCodeElevate) {
      if (storedUser) {
        setUser(storedUser);
        setIsLoggedIn(true);
      }
      if (stored2FAToken && storedVerified) {
        setToken2FA(stored2FAToken);
        setIsVerified(true);
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token2FA");
      localStorage.removeItem("isVerified");
      localStorage.removeItem("expireCodeElevate");
      setIsLoggedIn(false);
      setIsVerified(false);
      setUser(null);
      setToken2FA(null);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const expireCodeElevate = Date.now() + expiryTime;
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("expireCodeElevate", expireCodeElevate);
  };

  const verify = (data) => {
    const token2fa = data?.token2FA;
    setIsVerified(true);
    setToken2FA(token2fa);
    localStorage.setItem("isVerified", "true");
    localStorage.setItem("token2FA", token2fa);
  };

  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setIsVerified(false);
      setUser(null);
      setToken2FA(null);
      localStorage.removeItem("user");
      localStorage.removeItem("isVerified");
      localStorage.removeItem("token2FA");
      localStorage.removeItem("expireCodeElevate");
      localStorage.removeItem("welcome_to_codeelevate");
    }
  };

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        isVerified,
        token2FA,
        loading,
        user,
        login,
        verify,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
