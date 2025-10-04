import express from "express";
import auth from "../middlewares/auth.js";
import {
  deleteNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notificationControllers.js";

const router = express.Router();

//All routes required auth middleware
router.use(auth);

//Get All Notifications of current user Route
router.get("/", getNotifications);

router.patch("/:id/read", markAsRead);

router.delete("/:id", deleteNotification);

export default router;
