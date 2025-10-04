import api from "./api";

export const getNotifications = async () => {
  const response = await api.get("/notifications", {
    withCredentials: true,
  });
  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
