import api from "./api";
import { getToken2fa } from "./utils/getToken2FA.js";

export const getNotifications = async () => {
  const token2FA = getToken2fa();
  const response = await api.get("/notifications", {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.patch(
    `/notifications/${id}/read`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token2FA}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const deleteNotification = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.delete(`/notifications/${id}`, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};
