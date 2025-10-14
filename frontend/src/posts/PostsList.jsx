import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { motion } from "framer-motion";

const PostsList = ({
  allPosts,
  setAllPosts,
  currUserData,
  userId,
  isLoggedIn,
  isVerified,
}) => {
  const onPostUpdate = (updatedPost) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  return (
    <div className="w-full flex flex-wrap gap-1 items-center justify-around pt-5 md:px-6 pb-5 transition-all duration-300 ease-in-out">
      {allPosts && allPosts.length > 0 ? (
        allPosts
          .slice()
          .sort((a, b) => (a.image?.url ? -1 : 1))
          .map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -3 : 3 }}
              // initial={{ opacity: 0, y: 80, rotate: index % 2 === 0 ? -8 : 8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
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
