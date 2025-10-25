import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL
    ? `${import.meta.env.VITE_BACKEND_URL}/api`
    : "https://codeelevate.onrender.com/api", //live backend url
  // baseURL: `http://localhost:8080/api`, //backend url
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
