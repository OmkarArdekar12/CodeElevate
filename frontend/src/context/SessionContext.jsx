import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    // console.log("The useEffect runs: ", storedUser);
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const verify = () => {
    setIsVerified(true);
    sessionStorage.setItem("isVerified", "true");
  };

  const logout = (data) => {
    if (data) {
      setIsLoggedIn(false);
      setIsVerified(false);
      setUser(null);
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isVerified", "true");
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
