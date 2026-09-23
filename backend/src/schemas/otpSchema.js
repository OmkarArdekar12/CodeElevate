import mongoose from "mongoose";

const Schema = mongoose.Schema;

const otpSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purpose: {
    type: String,
    enum: ["enable", "link-email", "reset"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  lastSentAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
});

otpSchema.index({ user: 1, purpose: 1 }, { unique: true });

export default otpSchema;
