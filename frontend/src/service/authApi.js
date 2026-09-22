import api from "./api";

export const register = async (username, password) => {
  return await api.post("/auth/register", {
    username,
    password,
  });
};

export const loginUser = async (identifier, password) => {
  return await api.post(
    "/auth/login",
    {
      username: identifier,
      password,
    },
    {
      withCredentials: true,
    },
  );
};

export const authStatus = async () => {
  return await api.get("/auth/status", {
    withCredentials: true,
  });
};

export const logoutUser = async () => {
  return await api.post(
    "/auth/logout",
    {},
    {
      withCredentials: true,
    },
  );
};

export const sendEmailOtp = async (purpose, email) => {
  return await api.post(
    "/auth/2fa/email/send-otp",
    { purpose, email },
    { withCredentials: true },
  );
};

export const verifyEmailOtp = async (purpose, otp) => {
  return await api.post(
    "/auth/2fa/email/verify-otp",
    { purpose, otp },
    { withCredentials: true },
  );
};

export const setup2FA = async () => {
  return await api.post(
    "/auth/2fa/setup",
    {},
    {
      withCredentials: true,
    },
  );
};

export const confirm2FASetup = async (token) => {
  return await api.post(
    "/auth/2fa/setup/confirm",
    { token },
    { withCredentials: true },
  );
};

export const verify2FA = async (token) => {
  return await api.post(
    "/auth/2fa/verify",
    { token },
    {
      withCredentials: true,
    },
  );
};

export const disable2FA = async (token) => {
  return await api.post(
    "/auth/2fa/disable",
    { token },
    { withCredentials: true },
  );
};

// import api from "./api";

// export const register = async (username, password) => {
//   return await api.post("/auth/register", {
//     username,
//     password,
//   });
// };

// export const loginUser = async (username, password) => {
//   return await api.post(
//     "/auth/login",
//     {
//       username,
//       password,
//     },
//     {
//       withCredentials: true,
//     }
//   );
// };

// export const authStatus = async () => {
//   return await api.get("/auth/status", {
//     withCredentials: true,
//   });
// };

// export const logoutUser = async () => {
//   return await api.post(
//     "/auth/logout",
//     {},
//     {
//       withCredentials: true,
//     }
//   );
// };

// export const setup2FA = async () => {
//   return await api.post(
//     "/auth/2fa/setup",
//     {},
//     {
//       withCredentials: true,
//     }
//   );
// };

// export const verify2FA = async (token) => {
//   return await api.post(
//     "/auth/2fa/verify",
//     { token },
//     {
//       withCredentials: true,
//     }
//   );
// };

// export const reset2FA = async () => {
//   return await api.post(
//     "/auth/2fa/reset",
//     {},
//     {
//       withCredentials: true,
//     }
//   );
// };
