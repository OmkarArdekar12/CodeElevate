import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { motion } from "framer-motion";

const PostsList = ({ allPosts, fetchAllPosts }) => {
  return (
    <div className="w-full flex flex-wrap gap-4 items-center justify-around pt-5 md:px-6 pb-5">
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
              <PostCard postData={post} />
            </motion.div>
          ))
      ) : (
        <div className="flex items-center justify-center text-gray-300">
          No posts found
        </div>
      )}
    </div>
  );
};

export default PostsList;
