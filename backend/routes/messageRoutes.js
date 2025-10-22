import express from "express";
import auth from "../middlewares/auth.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import auth2FA from "../middlewares/auth2FA.js";
import {
  getMessages,
  getUserForMessage,
  getUsersForMessageSidebar,
  sendMessage,
} from "../controllers/messageController.js";
import { validateMessage } from "../middlewares/messageValidations.js";

const router = express.Router();

//Get All Users for Message Sidebar Route
router.get("/users", auth, verifyAuth, auth2FA, getUsersForMessageSidebar);

//Get Selected User for Messaging Route
router.get("/users/:id", auth, verifyAuth, auth2FA, getUserForMessage);

//Get All Messages between sender and receiver Route
router.get("/:id", auth, verifyAuth, auth2FA, getMessages);

//Send Message Route
router.post(
  "/send/:id",
  auth,
  verifyAuth,
  auth2FA,
  validateMessage,
  sendMessage
);

export default router;
