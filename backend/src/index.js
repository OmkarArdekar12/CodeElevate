import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import methodOverride from "method-override";
import localStrategy from "passport-local";
import { ExpressError } from "./utils/ExpressError.js";
import axios from "axios";
import passport from "passport";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
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

dotenv.config();

//Express App
const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://codeelevate-community.vercel.app";
const MONGODB_URL = process.env.MONGODB_URL;
const SESSION_SECRET = process.env.SESSION_SECRET || "codelevate-secret";
const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);

//HTTP Server for Socket.IO
const server = http.createServer(app);

//Database Connection
dbConnect();

const corsOptions = {
  origin: [FRONTEND_URL, "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

//Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(methodOverride("_method"));

const store = MongoStore.create({
  mongoUrl: MONGODB_URL,
  crypto: {
    secret: SESSION_SECRET,
  },
  touchAfter: 7 * 24 * 60 * 60,
});
store.on("error", () => {
  console.log("Error in Mongo Session Store", err);
});

const sessionOptions = {
  store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  },
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

//Socket.IO
const io = new Server(server, { cors: corsOptions });

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
app.use((req, res, next) => {
  pageNotFoundMiddleware(req, res, next);
});
app.use(errorHandlerMiddleware);

//Listen App
server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
