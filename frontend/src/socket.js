import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const socket = io(BASE_URL, { withCredentials: true });

export default socket;

// import { io } from "socket.io-client";
// const BASE_URL = "http://localhost:8080";
// const socket = io(BASE_URL, { withCredentials: true });
// export default socket;
