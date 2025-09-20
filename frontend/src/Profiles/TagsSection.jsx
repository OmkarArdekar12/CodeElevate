import React from "react";

const TagsSection = ({ tags }) => {
  return (
    <div className="w-full flex flex-col justify-center p-4">
      <h2 className="text-3xl mb-3 title-font">Tags</h2>
      <div className="w-full flex items-center flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 shadow-cyan-300 text-white inline m-1 py-1 px-2 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
