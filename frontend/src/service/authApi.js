import api from "./api";
import { getToken2fa } from "./utils/getToken2FA.js";

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
  const token2FA = getToken2fa();
  return await api.post(
    "/auth/2fa/email/send-otp",
    { purpose, email },
    {
      withCredentials: true,
      headers: token2FA ? { Authorization: `Bearer ${token2FA}` } : {},
    },
  );
};

export const verifyEmailOtp = async (purpose, otp) => {
  const token2FA = getToken2fa();
  return await api.post(
    "/auth/2fa/email/verify-otp",
    { purpose, otp },
    {
      withCredentials: true,
      headers: token2FA ? { Authorization: `Bearer ${token2FA}` } : {},
    },
  );
};

export const setup2FA = async (bearerToken) => {
  const token = bearerToken || getToken2fa();
  return await api.post(
    "/auth/2fa/setup",
    {},
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const confirm2FASetup = async (code, bearerToken) => {
  const token = bearerToken || getToken2fa();
  return await api.post(
    "/auth/2fa/setup/confirm",
    { token: code },
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    },
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
  const token2FA = getToken2fa();
  return await api.post(
    "/auth/2fa/disable",
    { token },
    {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token2FA}` },
    },
  );
};
