import React from "react";

const PostsSection = () => {
  return (
    <>
      <div className="w-full flex flex-col justify-center p-4">
        <h2 className="text-3xl mb-1 title-font">Posts</h2>
        <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly items-center flex-wrap mt-4 p-4 md:px-25"></div>
      </div>
      <hr className="w-full text-gray-600 my-10" />
    </>
  );
};

export default PostsSection;
