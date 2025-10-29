import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import methodOverride from "method-override";
import passport from "passport";
import LocalStrategy from "passport-local";
import axios from "axios";
import { Server } from "socket.io";
import http from "http";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import "./config/passportConfig.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import competitiveProgrammingStatsRoutes from "./routes/competitiveProgrammingStatsRoutes.js";
import developmentProfilesStatsRoutes from "./routes/developmentProfilesStatsRoutes.js";
import connectionRoutes from "./routes/connectionRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import {
  pageNotFoundMiddleware,
  errorHandlerMiddleware,
} from "./middlewares/errorHandlers.js";
import { ExpressError } from "./utils/ExpressError.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

//Express App
const app = express();

//HTTP Server for Socket.IO
const server = http.createServer(app);

//Socket.IO
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-Request-With",
      "Cookie",
    ],
  },
});

//Database Connection
dbConnect();

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Request-With",
    "Cookie",
  ],
};
app.use(cors(corsOptions));

//Middlewares
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URL,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  ttl: 7 * 24 * 60 * 60,
});
store.on("error", (err) => {
  console.log("Error in Mongo Session Store", err);
});

const sessionOptions = {
  store,
  name: "codeelevate.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

let activeUsers = new Map();

io.on("connection", (socket) => {
  //console.log("user connected: ", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    //console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    //console.log(`User ${socket.id} left room ${roomId}`);
  });

  socket.on("addUser", (userId) => {
    activeUsers.set(userId, socket.id);
    io.emit("getActiveUsers", Array.from(activeUsers.keys()));
  });

  socket.on("requestActiveUsers", () => {
    socket.emit("getActiveUsers", Array.from(activeUsers.keys()));
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of activeUsers.entries()) {
      if (socketId == socket.id) {
        activeUsers.delete(userId);
      }
    }
    //console.log("user disconnected: ", socket.id);
    io.emit("getActiveUsers", Array.from(activeUsers.keys()));
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use(
  "/api/stats/competitive-programming",
  competitiveProgrammingStatsRoutes
);
app.use("/api/stats/development-profiles", developmentProfilesStatsRoutes);
app.use("/api/users", connectionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/rankings", rankingRoutes);

//Index Route
app.get("/", (req, res) => {
  return res.send("Welcome to CodeElevate");
});

//Error handlers
app.all("*", pageNotFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 8080;
//Listen App
server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
