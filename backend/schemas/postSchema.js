import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
  image: String,
  likes: [
    {
      userId: Schema.Types.ObjectId,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      userId: Schema.Types.ObjectId,
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default postSchema;
