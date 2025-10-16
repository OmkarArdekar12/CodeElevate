import api from "./api";
import { getToken2fa } from "./utils/getToken2FA.js";

export const followUser = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.post(`/users/follow/${id}`, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const unfollowUser = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.post(`/users/unfollow/${id}`, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const connectRequest = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.post(`/users/connect/${id}`, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const connectResponse = async (id, action) => {
  const token2FA = getToken2fa();
  const response = await api.post(
    `/users/connect/response/${id}`,
    { action: action },
    {
      headers: {
        Authorization: `Bearer ${token2FA}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const unconnectUser = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.post(`/users/unconnect/${id}`, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const checkConnectionStatus = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.get(`/users/${id}/status`, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};
