import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["follow", "connect_request", "connect_accept", "connect_reject"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "seen"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", //auto delete after 7 days
  },
});

export default notificationSchema;
