import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, MoreVertical, Trash } from "lucide-react";
import { deleteComment } from "../service/postApi.js";
import toast from "react-hot-toast";

const Comment = ({ comment, postData, userId, onPostUpdate }) => {
  if (!comment) {
    return null;
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteCommentLoading, setDeleteCommentLoading] = useState(false);
  const navigate = useNavigate();
  const profileUserId =
    comment.user && comment.user._id ? comment.user._id : "";
  const username =
    comment.user && comment.user.username ? comment.user.username : "";
  const fullName =
    comment.profile && comment.profile.fullName ? comment.profile.fullName : "";
  const profilePicture =
    comment.profile && comment.profile.profilePicture
      ? comment.profile.profilePicture
      : "";
  const text = comment.text ? comment.text : "";
  const date = comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString("en-GB")
    : "";
  const commentId = comment._id;
  const commentUserId =
    comment.user && comment.user._id ? comment.user._id : "";
  const isCommentOwner = commentUserId === userId;

  const handleCommentDelete = async () => {
    setDeleteCommentLoading(true);
    try {
      const postId = postData._id;
      const response = await deleteComment(postId, commentId);
      toast.success("Comment deleted successfully!");
      const comments = postData.comments.filter(
        (comment) => comment._id !== commentId
      );
      const updatedPost = { ...postData, comments };
      onPostUpdate(updatedPost);
    } catch (err) {
      toast.error("Failed to delete comment.");
    } finally {
      setMenuOpen(false);
      setDeleteCommentLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col mb-3 pb-2 transition-all duration-200 ease-in-out">
      <div className="w-full flex">
        <img
          onClick={() => navigate(`/profiles/${profileUserId}`)}
          src={profilePicture || "/images/defaultUserImage.png"}
          alt="userImage"
          className="w-7 h-7 rounded-full object-cover mr-2 cursor-pointer"
        />
        <div className="w-full flex flex-col justify-center">
          <h2
            onClick={() => navigate(`/profiles/${profileUserId}`)}
            className="flex items-center font-normal text-sm text-gray-400 leading-none"
          >
            <span
              onClick={() => navigate(`/profiles/${profileUserId}`)}
              className="cursor-pointer"
            >
              {fullName}
            </span>
            <span className="font-normal mx-1">|</span>
            <span
              onClick={() => navigate(`/profiles/${profileUserId}`)}
              className="font-extralight text-xs italic cursor-pointer"
            >
              @{username}
            </span>
            <p className="text-xs font-extralight text-gray-500 ml-auto italic">
              {date}
            </p>
          </h2>
        </div>
        {isCommentOwner && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer pl-1"
            >
              <MoreVertical
                className="text-gray-500 hover:text-gray-300"
                size={20}
              />
            </button>
            {menuOpen && (
              <div className="absolute right-3 top-4 bg-slate-950 rounded-lg shadow-xs shadow-slate-600 py-1 px-4 space-y-1 z-10">
                <button
                  onClick={handleCommentDelete}
                  disabled={deleteCommentLoading}
                  className={`block w-full text-right px-0 py-1 font-medium ${
                    deleteCommentLoading
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-gray-500 hover:text-red-600 cursor-pointer"
                  } rounded-md text-sm`}
                >
                  {deleteCommentLoading ? (
                    <span className="inline-flex items-center">
                      <Loader2
                        className="text-gray-500 animate-spin mr-1"
                        size={15}
                      />
                      Deleting...
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <Trash size={15} className="mr-1" />
                      Delete
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {text && <div className="ml-10 text-gray-300 text-sm">{text}</div>}
    </div>
  );
};

export default Comment;
