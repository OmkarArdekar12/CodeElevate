import React from "react";

const TagsSection = ({ tags }) => {
  console.log(tags);
  if (!tags) {
    return null;
  }

  const hasAny = tags[0] || tags[1] || tags[2] || tags[3] || tags[4];
  return (
    <>
      {hasAny && tags && tags.length > 0 && (
        <>
          <div className="w-full flex flex-col justify-center p-4 transition-all duration-300 ease-in-out">
            <h2 className="text-2xl md:text-3xl mb-3 title-font">Tags</h2>
            <div className="w-full flex items-center flex-wrap">
              {tags.map((tag, index) =>
                tag ? (
                  <span
                    key={index}
                    className="bg-gradient-to-bl from-gray-500 via-gray-600 to-gray-700 shadow-cyan-300 hover:bg-gradient-to-br text-white inline m-1 py-1 px-2 rounded-lg"
                  >
                    {tag}
                  </span>
                ) : null
              )}
            </div>
          </div>
          <hr className="w-full text-gray-600 my-10" />
        </>
      )}
    </>
  );
};

export default TagsSection;
