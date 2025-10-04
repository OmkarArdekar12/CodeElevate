import api from "./api";

export const followUser = async (id) => {
  const response = await api.post(`/users/follow/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const unfollowUser = async (id) => {
  const response = await api.post(`/users/unfollow/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const connectRequest = async (id) => {
  const response = await api.post(`/users/connect/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const connectResponse = async (id, action) => {
  const response = await api.post(
    `/users/connect/response/${id}`,
    { action: action },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const unconnectUser = async (id) => {
  const response = await api.post(`/users/unconnect/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const checkConnectionStatus = async (id) => {
  const response = await api.get(`/users/${id}/status`, {
    withCredentials: true,
  });
  return response.data;
};
