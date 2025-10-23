import mongoose from "mongoose";
import postSchema from "../schemas/postSchema.js";

const Post = mongoose.model("Post", postSchema);

export default Post;
