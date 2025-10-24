import axios from "axios";

export default axios.create({
  baseURL:
    `${import.meta.env.VITE_BACKEND_URL}/api` ||
    "https://codeelevate.onrender.com/api", //live backend url
  //baseURL: `http://localhost:8080/api`, //backend url
  withCredentials: true,
});
