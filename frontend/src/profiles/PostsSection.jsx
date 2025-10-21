import React, { useState, useEffect } from "react";
import Loading2 from "../components/Loading2.jsx";
import PostsList from "../components/PostsList.jsx";
import { getUserData } from "../service/profileApi.js";
import { getUserPosts } from "../service/postApi.js";

const PostsSection = ({ profileUserId, isLoggedIn, isVerified, userId }) => {
  const [loading, setLoading] = useState(true);
  const [currUserData, setCurrUserData] = useState({});
  const [allUserPosts, setAllUserPosts] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (userId) {
        const user = await getUserData(userId);
        setCurrUserData(user);
      }
      const userPosts = await getUserPosts(profileUserId);
      setAllUserPosts(userPosts);
    } catch (err) {
      console.log("Error in fetching user posts: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      {allUserPosts && allUserPosts.length > 0 && (
        <div className="w-full flex flex-col justify-center mb-4 p-4 transition-all duration-300 ease-in-out">
          <h2 className="text-2xl md:text-3xl mb-1 title-font">Posts</h2>
          <PostsList
            allUserPosts={allUserPosts}
            setAllUserPosts={setAllUserPosts}
            currUserData={currUserData}
            userId={userId}
            isLoggedIn={isLoggedIn}
            isVerified={isVerified}
          />
        </div>
      )}
    </>
  );
};

export default PostsSection;
