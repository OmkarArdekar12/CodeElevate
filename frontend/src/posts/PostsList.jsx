import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import Loading from "../components/Loading.jsx";
import { getAllPosts } from "../service/postApi.js";

const PostsList = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const posts = await getAllPosts();
      console.log(posts);
      setAllPosts(posts);
    } catch (err) {
      console.log("Error in fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-wrap gap-4 items-center justify-around">
      {allPosts.map((post, idx) => (
        <PostCard postData={post} updatePostData={fetchAllPosts} key={idx} />
      ))}
    </div>
  );
};

export default PostsList;
