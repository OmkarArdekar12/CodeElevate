import Notification from "../models/notification.js";

//Get all Notification for logged-in user Controller
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ to: req.user_id })
      .populate("from", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error, failed to fetch notifications!",
      error: err,
    });
  }
};

//Mark a Notification as read Controller
export const markAsRead = async (req, res) => {
  try {
    const { id: notificationId } = req.params;
    const currUserId = req.user._id;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.to.toString() !== currUserId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error, failed to mark notification as read!",
      error: err,
    });
  }
};

//Delete a Notification Controller
export const deleteNotification = async (req, res) => {
  try {
    const { id: notificationId } = req.params;
    const currUserId = req.user._id;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.to.toString() !== currUserId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await notification.deleteOne();
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error, failed to delete notification!",
      error: err,
    });
  }
};
