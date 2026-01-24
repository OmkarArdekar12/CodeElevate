import React, { useState, useEffect } from "react";
import PostCard from "./PostCard.jsx";
import { motion } from "framer-motion";

const PostsList = ({
  allUserPosts,
  setAllUserPosts,
  currUserData,
  userId,
  isLoggedIn,
  isVerified,
}) => {
  const onPostUpdate = (updatedPost) => {
    setAllUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post,
      ),
    );
  };

  return (
    <div className="w-full flex flex-wrap gap-1 items-center justify-evenly pt-5 md:px-6 pb-5 transition-all duration-300 ease-in-out">
      {allUserPosts && allUserPosts.length > 0 ? (
        allUserPosts
          .slice()
          .sort((a, b) => (a.image?.url ? -1 : 1))
          .map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, x: -50, y: 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: "easeOut",
              }}
              className="inline-flex justify-center"
            >
              <PostCard
                postData={post}
                onPostUpdate={onPostUpdate}
                currUserData={currUserData}
                userId={userId}
                isLoggedIn={isLoggedIn}
                isVerified={isVerified}
                key={index}
              />
            </motion.div>
          ))
      ) : (
        <div className="flex items-center justify-center text-gray-300 pt-5">
          No posts found.
        </div>
      )}
    </div>
  );
};

export default PostsList;
