import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

export default api;

// import axios from "axios";
// const api = axios.create({
//   baseURL: `http://localhost:8080/api`, //backend url
//   withCredentials: true,
// });
// export default api;
