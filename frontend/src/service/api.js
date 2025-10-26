import axios from "axios";
import { getSessionUserId } from "./utils/getSessionUserId";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const sessionUserId = getSessionUserId();
  if (sessionUserId) {
    config.headers["user-session"] = sessionUserId;
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
