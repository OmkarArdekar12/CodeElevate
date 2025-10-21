import api from "./api";
import { getToken2fa } from "./utils/getToken2FA.js";

export const getUserForSidebar = async () => {
  const token2FA = getToken2fa();
  const response = await api.get("/messages/users", {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const getMessages = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.get(`/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const sendMessage = async (id, meesageData) => {
  const token2FA = getToken2fa();
  const response = await api.post(`/messages/send/${id}`, meesageData, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};
