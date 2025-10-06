import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import Comment from "./Comment.jsx";
import { GrSend } from "react-icons/gr";
import { useSession } from "../context/SessionContext.jsx";
import { addComment, likeOrUnlikePost } from "../service/postApi.js";
import Loading2 from "../components/Loading2.jsx";
import toast from "react-hot-toast";

const PostCard = ({ postData, updatePostData }) => {
  if (!postData) {
    return null;
  }

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const { isLoggedIn, user } = useSession();
  const userId = user && user.userId ? user.userId : "";

  const handleCommentToggle = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleLikeUnlike = async () => {
    try {
      const postId = postData._id;
      const response = await likeOrUnlikePost(postId);
      toast.success(response.message);
      if (updatePostData) {
        updatePostData();
      }
    } catch (err) {
      console.log("Error in Like/Unlike post");
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      setCommentLoading(true);
      try {
        const postId = postData._id;
        const response = await addComment(postId, { text: comment });
        toast.success(response.message);
        setComment("");
        setShowCommentBox(false);
        if (updatePostData) {
          updatePostData();
        }
      } catch (err) {
        console.log("Error in commenting on post");
      } finally {
        setCommentLoading(false);
      }
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

  return (
    <div className="w-[25rem] rounded-2xl bg-gray-100 hover:scale-[1.02] transition-transform duration-300 my-1">
      <div className="w-full flex items-center pt-4 pb-2 px-2 border-b border-slate-300">
        <img
          src={authorImage || "/images/defaultUserImage.png"}
          alt="authorProfileImage"
          className="w-12 h-12 rounded-full object-cover mr-2"
        />
        <div className="w-full flex flex-col justify-center">
          <h2 className="font-semibold text-lg text-gray-800 leading-none">
            {authorFullName}.{" "}
            <span className="font-light text-sm italic">@{authorUsername}</span>
          </h2>
          {authorHeadLine && (
            <h3 className="font-normal text-sm text-gray-800 leading-none">
              {authorHeadLine}
            </h3>
          )}
          {postUpdatedAtTime && (
            <p className="text-xs font-extralight text-gray-700 ml-auto">
              {postUpdatedAtTime}
            </p>
          )}
        </div>
      </div>

      <div className="pt-2 px-4 flex flex-col justify-center">
        {postTitle && (
          <h2 className="text-xl font-bold text-gray-900 pb-1">{postTitle}</h2>
        )}
        {postDescription && (
          <p className="mt-2 pb-2 text-gray-800 leading-none">
            {postDescription}
          </p>
        )}
        {postImage && (
          <img
            src={postImage}
            alt={postTitle}
            className="mt-4 w-full max-h-70 object-cover rounded-md"
          />
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-300">
        <div
          onClick={handleLikeUnlike}
          className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-red-600"
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
          className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-blue-600"
        >
          <div className="flex items-center leading-none">
            <MdOutlineMessage size={20} className="mr-1" />
            {postComments.length > 0 && <span>{postComments.length}</span>}
          </div>
          <p className="leading-none">Comment</p>
        </div>
      </div>

      {showCommentBox && (
        <div className="px-4 py-3 border-t border-gray-200">
          {postComments && postComments.length > 0 && (
            <div className="max-h-40 overflow-y-auto mb-3 pr-2">
              {postComments.map((comment, idx) => (
                <Comment comment={comment} key={idx} />
              ))}
            </div>
          )}
          <textarea
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
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
                  ? "bg-gray-500 cursor-not-allowed"
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
