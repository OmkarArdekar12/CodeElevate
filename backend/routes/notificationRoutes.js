import express from "express";
import auth from "../middlewares/auth.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import auth2FA from "../middlewares/auth2FA.js";
import {
  deleteNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

//All routes required auth middleware
router.use(auth);
router.use(verifyAuth);
router.use(auth2FA);

//Get All Notifications of current user Route
router.get("/", getNotifications);

router.patch("/:id/read", markAsRead);

router.delete("/:id", deleteNotification);

export default router;
