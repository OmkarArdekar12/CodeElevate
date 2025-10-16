import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { Loader2, MoreVertical } from "lucide-react";
import { MdOutlineMessage } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment.jsx";
import { GrSend } from "react-icons/gr";
import {
  addComment,
  deletePost,
  likeOrUnlikePost,
} from "../service/postApi.js";
import Loading2 from "../components/Loading2.jsx";
import toast from "react-hot-toast";

const PostCard = ({
  postData,
  onPostUpdate,
  currUserData,
  userId,
  isLoggedIn,
  isVerified,
}) => {
  if (!postData) {
    return null;
  }

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [deletePostLoading, setDeletePostLoading] = useState(false);
  const navigate = useNavigate();

  const handleCommentToggle = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleLikeUnlike = async () => {
    if (!isLoggedIn) {
      toast.error("You need to logged-in to access that");
      return;
    }
    if (!isVerified) {
      toast.error("You need to verify to access that");
      return;
    }
    try {
      const postId = postData._id;
      const response = await likeOrUnlikePost(postId);
      toast.success(response.message);
      const updatedPost = {
        ...postData,
        likes: isLiked
          ? postData.likes.filter((id) => id !== userId) //unlike
          : [...postData.likes, userId], //like
      };
      onPostUpdate(updatedPost);
    } catch (err) {
      console.log("Error in Like/Unlike post");
    }
  };

  const handleCommentSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("You need to logged-in to access that");
      navigate("/login");
      return;
    }
    if (!isVerified) {
      toast.error("You need to verify to access that");
      navigate("/verify-2fa");
      return;
    }
    if (comment.trim()) {
      setCommentLoading(true);
      try {
        const postId = postData._id;
        const response = await addComment(postId, { text: comment });
        toast.success(response.message);
        const addedComment =
          response && response.comment
            ? response.comment
            : {
                text: comment,
                user: {
                  _id: currUserData.userId,
                  username: currUserData.username,
                },
                profile: {
                  _id: currUserData.profileId,
                  fullName: currUserData.fullName,
                  profilePicture: currUserData.profilePicture,
                  headLine: currUserData.headLine,
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              };
        setComment("");
        setShowCommentBox(false);
        const updatedPost = {
          ...postData,
          comments: [...postData.comments, addedComment],
        };
        onPostUpdate(updatedPost);
      } catch (err) {
        console.log("Error in commenting on post");
      } finally {
        setCommentLoading(false);
      }
    }
  };

  const handlePostDelete = async () => {
    if (!isLoggedIn) {
      toast.error("You need to logged-in to access that");
      navigate("/login");
      return;
    }
    if (!isVerified) {
      toast.error("You need to verify to access that");
      navigate("/verify-2fa");
      return;
    }
    setDeletePostLoading(true);
    try {
      const postId = postData._id;
      const response = await deletePost(postId);
      toast.success(response.message);
      const updatedPost = { _id: postId };
      onPostUpdate(updatedPost);
    } catch (err) {
      console.log("Error in commenting on post", err);
    } finally {
      setMenuOpen(false);
      setDeletePostLoading(false);
    }
  };

  const authorUsername =
    postData.user && postData.user.username ? postData.user.username : "";
  const authorFullName =
    postData.profile && postData.profile.fullName
      ? postData.profile.fullName
      : "";
  const authorImage =
    postData.profile && postData.profile.profilePicture
      ? postData.profile.profilePicture
      : "";
  const authorHeadLine =
    postData.profile && postData.profile.headLine
      ? postData.profile.headLine
      : "";
  const postTitle = postData.title ? postData.title : "";
  const postDescription = postData.description ? postData.description : "";
  const postImage =
    postData.image && postData.image.url ? postData.image.url : "";
  const postUpdatedAtTime = postData.updatedAt
    ? new Date(postData.updatedAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const postLikes = postData.likes ? postData.likes : [];
  const postComments = postData.comments ? postData.comments : [];
  const isLiked = postLikes.includes(userId);
  const authorUserId =
    postData.user && postData.user._id ? postData.user._id : "";
  const postId = postData._id ? postData._id : "";
  const isPostOwner = authorUserId == userId;

  const isEmpty = !postTitle && !postDescription && !postImage;

  if (isEmpty) {
    return null;
  }

  return (
    <div className="PostCard text-gray-100 rounded-2xl bg-slate-950 hover:scale-[1.02] transition-all duration-300 ease-in-out my-1 shadow-sm shadow-slate-500">
      <div className="w-full flex items-center pt-4 pb-2 px-2 border-b border-slate-800">
        <img
          src={authorImage || "/images/defaultUserImage.png"}
          alt="authorProfileImage"
          className="w-12 h-12 rounded-full object-cover mr-2"
        />
        <div className="w-full flex flex-col justify-center">
          <h2 className="font-semibold text-lg text-gray-100 leading-none">
            {authorFullName}
          </h2>
          {authorHeadLine && (
            <h3 className="font-normal text-sm text-gray-300 leading-none">
              {authorHeadLine}
            </h3>
          )}
          {postUpdatedAtTime && (
            <p className="text-xs font-extralight text-gray-400 ml-auto">
              {postUpdatedAtTime}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2 px-4 flex flex-col justify-center">
        {postTitle && (
          <h2 className="text-xl font-semibold text-gray-100 pb-1">
            {postTitle}
          </h2>
        )}
        {postDescription && (
          <p className="mt-2 pb-2 text-gray-200 leading-none">
            {postDescription}
          </p>
        )}
        {postImage && (
          <img
            src={postImage}
            alt={postTitle}
            className="mt-4 w-full max-h-70 object-contain rounded-md"
          />
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800">
        <div
          onClick={handleLikeUnlike}
          className="flex flex-col items-center cursor-pointer text-slate-500 hover:text-red-600"
        >
          <div className="flex items-center leading-none">
            {isLiked ? (
              <BiSolidLike size={20} className="mr-1 text-red-500" />
            ) : (
              <BiLike size={20} className="mr-1" />
            )}
            {postLikes.length > 0 && <span>{postLikes.length}</span>}
          </div>
          <p className="leading-none">Like</p>
        </div>
        <div
          onClick={handleCommentToggle}
          className="flex flex-col items-center cursor-pointer text-slate-500 hover:text-blue-600"
        >
          <div className="flex items-center leading-none">
            <MdOutlineMessage size={20} className="mr-1" />
            {postComments.length > 0 && <span>{postComments.length}</span>}
          </div>
          <p className="leading-none">Comment</p>
        </div>
        {isLoggedIn && isVerified && isPostOwner && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer"
            >
              <MoreVertical className="text-slate-500 hover:text-gray-300" />
            </button>
            {menuOpen && (
              <div className="absolute right-3 -top-20 bg-slate-950 rounded-lg shadow-xs shadow-slate-600 py-1 px-4 space-y-1 z-10">
                <button
                  onClick={() =>
                    navigate(`/posts/${postId}/edit`, {
                      state: { from: window.location.pathname },
                    })
                  }
                  className="block w-full font-medium text-left px-1 py-1 text-gray-600 hover:text-gray-400 rounded-md text-sm cursor-pointer"
                >
                  Edit Post
                </button>
                <hr className="block w-full text-slate-800 text-left px-10 py-0 transparent" />
                <button
                  onClick={handlePostDelete}
                  disabled={deletePostLoading}
                  className={`block w-full text-left px-1 py-1 font-medium ${
                    deletePostLoading
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-gray-600 hover:text-red-600 cursor-pointer"
                  } rounded-md text-sm`}
                >
                  {deletePostLoading ? (
                    <span className="inline-flex items-center">
                      <Loader2
                        className="text-gray-500 animate-spin mr-1"
                        size={15}
                      />
                      Deleting...
                    </span>
                  ) : (
                    <span>Delete Post</span>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showCommentBox && (
        <div className="px-4 py-3 border-t border-slate-800">
          {postComments && postComments.length > 0 && (
            <div className="max-h-40 overflow-y-auto mb-3 pr-2">
              {postComments.map((comment, idx) => (
                <Comment
                  comment={comment}
                  postData={postData}
                  userId={userId}
                  onPostUpdate={onPostUpdate}
                  key={idx}
                />
              ))}
            </div>
          )}
          <textarea
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-slate-700 text-gray-200"
            rows="1"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              disabled={commentLoading}
              className={`flex items-center text-white px-4 py-1 rounded-xl transition-colors ${
                commentLoading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              }`}
              onClick={handleCommentSubmit}
            >
              {commentLoading ? <Loading2 text="Commenting..." /> : "Comment"}
              <GrSend className="ml-1 inline" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
