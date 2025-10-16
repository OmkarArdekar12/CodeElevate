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

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedVerified = sessionStorage.getItem("isVerified") === "true";
    const stored2FAToken = sessionStorage.getItem("token2FA");
    // console.log("The useEffect runs: ", storedUser);
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    if (stored2FAToken && storedVerified) {
      setToken2FA(stored2FAToken);
      setIsVerified(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const verify = (data) => {
    console.log(data);
    const token2fa = data?.token2FA;
    setIsVerified(true);
    setToken2FA(token2fa);
    sessionStorage.setItem("isVerified", "true");
    sessionStorage.setItem("token2FA", token2fa);
  };

  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setIsVerified(false);
      setUser(null);
      setToken2FA(null);
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isVerified");
      sessionStorage.removeItem("token2FA");
    }
  };

  return (
    <SessionContext.Provider
      value={{ isLoggedIn, isVerified, loading, user, login, verify, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};
