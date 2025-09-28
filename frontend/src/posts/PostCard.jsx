import React from "react";

const PostCard = () => {
  return (
    <div className="flex flex-col justify-center border-2">
      <div>Title</div>
      <div>Description</div>
      <div>Image</div>
      <button>Like</button>
    </div>
  );
};

export default PostCard;
