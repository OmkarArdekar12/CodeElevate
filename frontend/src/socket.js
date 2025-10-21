import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8080";

const socket = io(BASE_URL, { withCredentials: true });

export default socket;
