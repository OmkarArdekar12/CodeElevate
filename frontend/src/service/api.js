import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : "https://codeelevate.onrender.com/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  const userId = user ? user.userId : "";
  if (userId) {
    config.headers["logged-in-user"] = userId;
  }
  return config;
});

export default api;

// import axios from "axios";
// const api = axios.create({
//   baseURL: `http://localhost:8080/api`, //backend url
//   withCredentials: true,
// });
// export default api;
