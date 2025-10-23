import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    image: {
      publicId: String,
      url: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

export default postSchema;
