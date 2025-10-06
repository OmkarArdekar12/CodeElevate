// import React from "react";

// const PostCard = () => {
//   return (
//     <div className="flex flex-col justify-center border-2">
//       <div>Title</div>
//       <div>Description</div>
//       <div>Image</div>
//     </div>
//   );
// };

// export default PostCard;

import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import Comment from "./Comment.jsx";
import { GrSend } from "react-icons/gr";

const PostCard = () => {
  const [postData, setPostData] = useState({
    image: {
      publicId: "CodeElevate_Project/posts/xiymzr7ipp8djehyizzi",
      url: "https://res.cloudinary.com/dxqftuwcr/image/upload/v1759675568/CodeElevate_Project/posts/xiymzr7ipp8djehyizzi.png",
    },
    _id: "68e284b1baecbf2a5c3cb65e",
    user: {
      _id: "68dc2be8a834836f4b62bb52",
      username: "alice",
    },
    profile: {
      _id: "68dc2be8a834836f4b62bb54",
      fullName: "alice",
      profilePicture:
        "https://res.cloudinary.com/dxqftuwcr/image/upload/v1759259773/CodeElevate_Project/pfqgmtss1k1ssizvpppn.png",
      headLine: "Coding is Passion",
    },
    title: "Working",
    description: "It is very nice day",
    likes: ["68dc2be8a834836f4b62bb52"],
    comments: [
      {
        user: {
          _id: "68dc2be8a834836f4b62bb52",
          username: "alice",
        },
        profile: {
          _id: "68dc2be8a834836f4b62bb54",
          fullName: "alice",
          profilePicture:
            "https://res.cloudinary.com/dxqftuwcr/image/upload/v1759259773/CodeElevate_Project/pfqgmtss1k1ssizvpppn.png",
          headLine: "Coding is Passion",
        },
        text: "Great! Very nice!",
        _id: "68e3d8697987f537c164c6e3",
        createdAt: "2025-10-06T14:55:37.142Z",
        updatedAt: "2025-10-06T14:55:37.142Z",
      },
      {
        user: {
          _id: "68dc2be8a834836f4b62bb52",
          username: "alice",
        },
        profile: {
          _id: "68dc2be8a834836f4b62bb54",
          fullName: "alice",
          profilePicture:
            "https://res.cloudinary.com/dxqftuwcr/image/upload/v1759259773/CodeElevate_Project/pfqgmtss1k1ssizvpppn.png",
          headLine: "Coding is Passion",
        },
        text: "Great! Very nice!",
        _id: "68e3d8697987f537c164c6e3",
        createdAt: "2025-10-06T14:55:37.142Z",
        updatedAt: "2025-10-06T14:55:37.142Z",
      },
      {
        user: {
          _id: "68dc2be8a834836f4b62bb52",
          username: "alice",
        },
        profile: {
          _id: "68dc2be8a834836f4b62bb54",
          fullName: "alice",
          profilePicture:
            "https://res.cloudinary.com/dxqftuwcr/image/upload/v1759259773/CodeElevate_Project/pfqgmtss1k1ssizvpppn.png",
          headLine: "Coding is Passion",
        },
        text: "Great! Very nice!",
        _id: "68e3d8697987f537c164c6e3",
        createdAt: "2025-10-06T14:55:37.142Z",
        updatedAt: "2025-10-06T14:55:37.142Z",
      },
    ],
    createdAt: "2025-10-05T14:46:09.043Z",
    updatedAt: "2025-10-06T14:55:37.142Z",
    __v: 4,
  });

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const handleCommentToggle = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComment("");
      setShowCommentBox(false);
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
  const postUpdatedAtTime = postData.updated
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

  return (
    <div className="w-[25rem] rounded-2xl bg-gray-100 hover:scale-[1.02] transition-transform duration-300">
      <div className="w-full flex items-center pt-4 pb-1 px-2 border-b border-slate-300">
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

      {/* Post Content */}
      <div className="pt-2 px-4 flex flex-col justify-center">
        {postTitle && (
          <h2 className="text-xl font-bold text-gray-900">{postTitle}</h2>
        )}
        {postDescription && (
          <p className="mt-2 text-gray-800 leading-none">{postDescription}</p>
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
        <div className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-red-600">
          <div className="flex items-center leading-none">
            <BiLike size={20} className="mr-1" />
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
              className="flex items-center bg-blue-600 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition-colors cursor-pointer"
              onClick={handleCommentSubmit}
            >
              Comment
              <GrSend className="ml-1 inline" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
