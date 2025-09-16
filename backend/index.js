import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import path from "path";
import methodOverride from "method-override";
import passport from "passport";
import localStrategy from "passport-local";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import "./config/passportConfig.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();
const MONGODB_URL = "mongodb://127.0.0.1:27017/codelevate";
const PORT = process.env.PORT || 8080;

dbConnect();

//Middlewares
const corsOptions = {
  origin: ["http://localhost:3001"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);

//Listen App
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});

// //Index Route - User Profiles
// app.get("/profiles", async (req, res) => {
//   const allProfiles = await User.find({});
//   res.send(allProfiles);
// });

// //Show Route - User Profile
// app.get("/profiles/:id", async (req, res) => {
//   let { id } = req.params;
//   const profile = await User.findById(id);
//   res.send(profile);
// });
