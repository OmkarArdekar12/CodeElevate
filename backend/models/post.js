const mongoose = require("mongoose");
const postSchema = require("../schemas/postSchema.js");
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
