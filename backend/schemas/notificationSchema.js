import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["connect", "message"],
    required: true,
  },
  status: {
    type: String,
    enum: ["connected", "pending", "not_connected", "none", ""],
    default: "",
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", //auto delete after 7 days
  },
});

export default notificationSchema;
