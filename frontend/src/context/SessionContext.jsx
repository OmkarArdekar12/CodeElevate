import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import socketService from "../socket.js";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token2FA, setToken2FA] = useState(null);
  const [socket, setSocket] = useState(null);

  const expiryTime = 7 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    const expireCodeElevate = localStorage.getItem("expireCodeElevate");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedVerified = localStorage.getItem("isVerified") === "true";
    const stored2FAToken = localStorage.getItem("token2FA");
    if (expireCodeElevate && Date.now() < +expireCodeElevate) {
      if (storedUser) {
        setUser(storedUser);
        setIsLoggedIn(true);
      }
      if (stored2FAToken && storedVerified) {
        setToken2FA(stored2FAToken);
        setIsVerified(true);

        if (!socketService.connected) {
          socketService.connect();
          socketService.on("connect", () => {
            socketService.emit("addUser", storedUser.userId);
          });
        } else {
          socketService.emit("addUser", storedUser.userId);
        }
        setSocket(socketService);
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
      setSocket(null);
    }
    setLoading(false);

    return () => {
      if (socketService) {
        socketService.off("connect");
      }
    };
  }, []);

  const startVerifiedSession = (token, userId) => {
    setIsVerified(true);
    setToken2FA(token);
    if (!socketService.connected) {
      socketService.connect();
      socketService.on("connect", () => {
        socketService.emit("addUser", userId);
      });
    } else {
      socketService.emit("addUser", userId);
    }
    setSocket(socketService);
    localStorage.setItem("isVerified", "true");
    localStorage.setItem("token2FA", token);
  };

  const login = (userData) => {
    const { token2FA: sessionToken, ...userInfo } = userData;
    const expireCodeElevate = Date.now() + expiryTime;
    setIsLoggedIn(true);
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    localStorage.setItem("expireCodeElevate", expireCodeElevate);

    if (sessionToken && !userInfo.isMfaActive) {
      startVerifiedSession(sessionToken, userInfo.userId);
    }
  };

  const verify = (data) => {
    startVerifiedSession(data?.token2FA, user?.userId ?? data?.userId);
  };

  const updateUser = (patch) => {
    const next = { ...(user || {}), ...patch };
    setUser(next);
    localStorage.setItem("user", JSON.stringify(next));
  };

  const logout = (data) => {
    if (data) {
      if (socket?.connected) {
        socket.disconnect();
      }
      setSocket(null);
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
        socket,
        login,
        verify,
        updateUser,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// import { createContext, useContext } from "react";
// import { useState, useEffect } from "react";
// import socketService from "../socket.js";

// const SessionContext = createContext();

// export const useSession = () => useContext(SessionContext);

// export const SessionProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [token2FA, setToken2FA] = useState(null);
//   const [socket, setSocket] = useState(null);

//   const expiryTime = 7 * 24 * 60 * 60 * 1000;

//   useEffect(() => {
//     const expireCodeElevate = localStorage.getItem("expireCodeElevate");
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const storedVerified = localStorage.getItem("isVerified") === "true";
//     const stored2FAToken = localStorage.getItem("token2FA");
//     // console.log("The useEffect runs: ", storedUser);
//     if (expireCodeElevate && Date.now() < +expireCodeElevate) {
//       if (storedUser) {
//         setUser(storedUser);
//         setIsLoggedIn(true);
//       }
//       if (stored2FAToken && storedVerified) {
//         setToken2FA(stored2FAToken);
//         setIsVerified(true);

//         if (!socketService.connected) {
//           socketService.connect();
//           socketService.on("connect", () => {
//             socketService.emit("addUser", storedUser.userId);
//           });
//         } else {
//           socketService.emit("addUser", storedUser.userId);
//         }
//         setSocket(socketService);
//       }
//     } else {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token2FA");
//       localStorage.removeItem("isVerified");
//       localStorage.removeItem("expireCodeElevate");
//       setIsLoggedIn(false);
//       setIsVerified(false);
//       setUser(null);
//       setToken2FA(null);
//       setSocket(null);
//     }
//     setLoading(false);

//     return () => {
//       if (socketService) {
//         socketService.off("connect");
//       }
//     };
//   }, []);

//   const login = (userData) => {
//     const expireCodeElevate = Date.now() + expiryTime;
//     setIsLoggedIn(true);
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("expireCodeElevate", expireCodeElevate);
//   };

//   const verify = (data) => {
//     const token2fa = data?.token2FA;
//     setIsVerified(true);
//     setToken2FA(token2fa);
//     //connect socket and emit addUser after connection
//     if (!socketService.connected) {
//       socketService.connect();
//       socketService.on("connect", () => {
//         socketService.emit("addUser", user.userId);
//       });
//     } else {
//       socketService.emit("addUser", user.userId);
//     }
//     setSocket(socketService);
//     localStorage.setItem("isVerified", "true");
//     localStorage.setItem("token2FA", token2fa);
//   };

//   const logout = (data) => {
//     if (data) {
//       if (socket?.connected) {
//         socket.disconnect();
//       }
//       setSocket(null);
//       setIsLoggedIn(false);
//       setIsVerified(false);
//       setUser(null);
//       setToken2FA(null);
//       localStorage.removeItem("user");
//       localStorage.removeItem("isVerified");
//       localStorage.removeItem("token2FA");
//       localStorage.removeItem("expireCodeElevate");
//       localStorage.removeItem("welcome_to_codeelevate");
//     }
//   };

//   return (
//     <SessionContext.Provider
//       value={{
//         isLoggedIn,
//         isVerified,
//         token2FA,
//         loading,
//         user,
//         socket,
//         login,
//         verify,
//         logout,
//       }}
//     >
//       {children}
//     </SessionContext.Provider>
//   );
// };
