const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: ObjectId,
  content: String,
  image: String,
  likes: [ObjectId],
  comments: [
    {
      userId: ObjectId,
      comment: String,
      createdAt: Date,
    },
  ],
  createdAt: Date,
});

module.exports = postSchema;
