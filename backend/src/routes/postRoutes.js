import express from "express";
import auth from "../middlewares/auth.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import auth2FA from "../middlewares/auth2FA.js";
import {
  addComment,
  createPost,
  deletePost,
  destroyComment,
  editPost,
  getAllPosts,
  getPost,
  getUserPosts,
  likeOrUnlikePost,
} from "../controllers/postController.js";
import {
  validatePost,
  isOwner,
  isCommentOwner,
} from "../middlewares/postValidations.js";
import multer from "multer";
import { storage } from "../config/cloudConfig.js";

const upload = multer({ storage });

const router = express.Router();

//Create Post Route
router.post(
  "/",
  auth,
  verifyAuth,
  auth2FA,
  upload.single("image"),
  validatePost,
  createPost
);

//Get All Post Route
router.get("/", getAllPosts);

//Get Post Route
router.get("/:id/data", getPost);

//Like/Unlike Post Route
router.patch("/:id/like", auth, verifyAuth, auth2FA, likeOrUnlikePost);

//Add Comment Post Route
router.put("/:id/comment", auth, verifyAuth, auth2FA, addComment);

//Edit Post Route
router.put(
  "/:id/edit",
  auth,
  verifyAuth,
  auth2FA,
  validatePost,
  isOwner,
  editPost
);

//Delete Comment Post Route
router.delete(
  "/:postId/comment/:commentId",
  auth,
  verifyAuth,
  auth2FA,
  isCommentOwner,
  destroyComment
);

//Delete Post Route
router.delete("/:id", auth, verifyAuth, auth2FA, isOwner, deletePost);

//Get User All Post Route
router.get("/:id", getUserPosts);

export default router;
