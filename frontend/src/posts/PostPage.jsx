import { useState, useEffect } from "react";
import PostsList from "./PostsList.jsx";
import Loading from "../components/Loading.jsx";
import { getAllPosts } from "../service/postApi.js";
import { getUserData } from "../service/profileApi.js";
import { useSession } from "../context/SessionContext.jsx";

export default function PostPage() {
  const [allPosts, setAllPosts] = useState([]);
  const [currUserData, setCurrUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, user } = useSession();
  const userId = user && user.userId ? user.userId : "";

  const fetchData = async () => {
    setLoading(true);
    try {
      if (userId) {
        const user = await getUserData(userId); //fetch currUser data
        setCurrUserData(user);
      }
      const posts = await getAllPosts(); //fetch allPosts data
      setAllPosts(posts);
    } catch (err) {
      console.log("Error in fetching posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center text-white py-4 px-2 md:px-10 mb-5 transition-all duration-300 ease-in-out">
      <div className="w-full flex">
        <h1 className="text-3xl hover-text-border text-gray-100">All Posts</h1>
      </div>
      <PostsList
        allPosts={allPosts}
        setAllPosts={setAllPosts}
        currUserData={currUserData}
        userId={userId}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
