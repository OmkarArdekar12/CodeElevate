import mongoose from "mongoose";
import notificationSchema from "../schemas/notificationSchema.js";

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
