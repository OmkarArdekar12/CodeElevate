import React from "react";

const PostingFeature = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 gap-2 py-10 text-gray-200">
      <div className="flex flex-col items-center justify-center w-full text-xl px-2 md:px-14 gap-3">
        <h2 className="text-3xl font-semibold text-center">Post Feature</h2>
        <p>
          The post feature in CodeElevate enables users to actively engage and
          contribute within the coders community. Users can create new posts to
          share updates, achievements, thoughts, or technical insights,
          fostering ongoing interaction and knowledge sharing. Additionally,
          users have full control over their content, with the ability to edit
          posts to update or refine their messages as needed. Posts can also be
          deleted by their creators, allowing for privacy and content
          management. Users can like posts to show appreciation and comment on
          posts for discussions and feedback. Importantly, users can delete
          their own comments, ensuring they maintain control over their
          contributions and conversations. Together, these features create a
          lively, interactive space that encourages ongoing communication,
          collaboration, and community building on CodeElevate.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-2">
        <img
          src="/about/postFeature.png"
          alt="Authentication Image"
          className="w-full md:w-1/2"
        />
        <img
          src="/about/postOptions.png"
          alt="Authentication Image"
          className="w-full md:w-1/2"
        />
      </div>
    </div>
  );
};

export default PostingFeature;
