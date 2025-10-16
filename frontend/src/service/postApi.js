import api from "./api";
import { getToken2fa } from "./utils/getToken2FA.js";

export const createPost = async (post) => {
  const token2FA = getToken2fa();
  const response = await api.post("/posts", post, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.data;
};

export const editPost = async (id, post) => {
  const token2FA = getToken2fa();
  const response = await api.put(`/posts/${id}/edit`, post, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const getAllPosts = async () => {
  const response = await api.get("/posts", { withCredentials: true });
  return response.data;
};

export const getUserPosts = async (id) => {
  const response = await api.get(`/posts/${id}`, { withCredentials: true });
  return response.data;
};

export const getPost = async (id) => {
  const response = await api.get(`/posts/${id}/data`, {
    withCredentials: true,
  });
  return response.data;
};

export const likeOrUnlikePost = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.patch(
    `/posts/${id}/like`,
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

export const addComment = async (id, comment) => {
  const token2FA = getToken2fa();
  const response = await api.put(`/posts/${id}/comment`, comment, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const deleteComment = async (postId, commentId) => {
  const token2FA = getToken2fa();
  const response = await api.delete(`/posts/${postId}/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};

export const deletePost = async (id) => {
  const token2FA = getToken2fa();
  const response = await api.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token2FA}`,
    },
    withCredentials: true,
  });
  return response.data;
};
