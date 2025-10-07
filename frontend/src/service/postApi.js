import api from "./api";

export const createPost = async (post) => {
  const response = await api.post("/posts", post, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
};

export const editPost = async (id, post) => {
  const response = await api.put(`/posts/${id}/edit`, post, {
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
  const response = await api.patch(`/posts/${id}/like`, {
    withCredentials: true,
  });
  return response.data;
};

export const addComment = async (id, comment) => {
  const response = await api.put(`/posts/${id}/comment`, comment, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteComment = async (postId, commentId) => {
  const response = await api.delete(`/posts/${postId}/comment/${commentId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`, { withCredentials: true });
  return response.data;
};
