import { useState, useEffect } from "react";
import PostsList from "./PostsList.jsx";
import Loading from "../components/Loading.jsx";
import { getAllPosts } from "../service/postApi.js";

export default function PostPage() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const posts = await getAllPosts();
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
    <div className="w-full flex flex-col items-center justify-center text-white py-4 px-2 md:px-10 mb-5">
      <div className="w-full flex">
        <h1 className="text-3xl hover-text-border text-gray-100">All Posts</h1>
      </div>
      <PostsList allPosts={allPosts} setAllPosts={setAllPosts} />
    </div>
  );
}
