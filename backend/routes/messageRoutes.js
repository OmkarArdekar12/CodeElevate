import express from "express";
import auth from "../middlewares/auth.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import auth2FA from "../middlewares/auth2FA.js";
import {
  getMessages,
  getUsersForMessageSidebar,
  sendMessage,
} from "../controllers/messageController.js";
import { validateMessage } from "../middlewares/messageValidations.js";

const router = express.Router();

router.get("/users", auth, verifyAuth, auth2FA, getUsersForMessageSidebar);

router.get("/:id", auth, verifyAuth, auth2FA, getMessages);

router.post(
  "/send/:id",
  auth,
  verifyAuth,
  auth2FA,
  validateMessage,
  sendMessage
);

export default router;
