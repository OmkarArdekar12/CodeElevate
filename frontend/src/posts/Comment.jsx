import React from "react";

const Comment = ({ comment }) => {
  if (!comment) {
    return null;
  }
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
  return (
    <div className="w-full flex flex-col mb-3 pb-2">
      <div className="w-full flex">
        <img
          src={profilePicture || "/images/defaultUserImage.png"}
          alt="userImage"
          className="w-7 h-7 rounded-full object-cover mr-2"
        />
        <div className="w-full flex flex-col justify-center">
          <h2 className="flex items-center font-normal text-sm text-gray-800 leading-none">
            {fullName}
            <span className="font-normal mx-1">|</span>
            <span className="font-extralight text-xs italic">@{username}</span>
            <p className="text-xs font-extralight text-gray-500 ml-auto italic">
              {date}
            </p>
          </h2>
        </div>
      </div>
      {text && <div className="ml-10 text-gray-800 text-sm">{text}</div>}
    </div>
  );
};

export default Comment;
