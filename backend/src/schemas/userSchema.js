import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    normalizedUsername: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      select: false,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    isMfaActive: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: {
      type: String,
    },

    twoFactorTempSecret: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export default userSchema;
