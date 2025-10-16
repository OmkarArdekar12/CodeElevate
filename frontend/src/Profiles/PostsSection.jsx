import React, { useState, useEffect } from "react";
import Loading2 from "../components/Loading2";
import { getUserData } from "../service/profileApi";
import { getUserPosts } from "../service/postApi";

const PostsSection = ({ profileUserId }) => {
  const [loading, setLoading] = useState(true);

  const fetchAllUserPosts = async () => {
    setLoading(true);
    try {
      const userPosts = await getUserPosts(profileUserId);
      console.log(userPosts);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUserPosts();
  }, [profileUserId]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center p-5">
        <Loading2 text="Loading Posts..." />
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex flex-col justify-center mb-4 p-4 transition-all duration-300 ease-in-out">
        <h2 className="text-2xl md:text-3xl mb-1 title-font">Posts</h2>
        <div className="flex justify-center flex-col lg:flex-row lg:justify-evenly items-center flex-wrap mt-4 p-4 md:px-25"></div>
      </div>
    </>
  );
};

export default PostsSection;
