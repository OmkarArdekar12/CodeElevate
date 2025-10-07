import React, { useState } from "react";
import { createPost, editPost, getPost } from "../service/postApi";
import toast from "react-hot-toast";
import { ImagePlus, Loader2 } from "lucide-react";
import {
  Navigate,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Loading2 from "../components/Loading2";
import { IoIosSend } from "react-icons/io";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { useSession } from "../context/SessionContext";

const EditPostPage = () => {
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSession();
  const location = useLocation();
  const previousUrl = location.state?.from || "/";
  const userId = user.userId;
  const postUserId =
    postData.user && postData.user._id ? postData.user._id : "";

  const fetchPostData = async () => {
    setLoading(true);
    try {
      const post = await getPost(id);
      setPostData(post);
    } catch (err) {
      console.log("Error in fetching Post data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  //   useEffect(() => {
  //     if (!loading && userId && postUserId && userId !== postUserId) {
  //       toast.error("Access denied. You can only edit your own post.", {
  //         id: "Invalid user to update post",
  //       });
  //       navigate("/posts");
  //     }
  //   }, [userId, postUserId, loading]);

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!postData.title.trim()) {
      toast.error("Post title is required!");
      return;
    }

    try {
      setEditLoading(true);
      const postId = postData._id;
      const post = { title: postData.title, description: postData.description };
      const response = await editPost(postId, post);
      toast.success("Post updated successfully");
      navigate(previousUrl);
    } catch (err) {
      console.log(err);
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (userId !== postUserId) {
    toast.error("Access denied. You can only edit your own post.", {
      id: "Invalid user to update post",
    });
    navigate("/posts");
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#01161e] text-white px-4 py-8 transition-all duration-300 ease-in-out">
      <div className="bg-[#03393f] p-6 rounded-2xl shadow-md w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl font-semibold mb-6 text-center">Edit Post</h1>

        <form onSubmit={handleEdit} className="flex flex-col space-y-4">
          {postData.image && postData.image.url && (
            <div className="flex flex-col items-center justify-center border-2 border-gray-600 rounded-xl p-4 transition-all">
              <img
                src={postData.image.url}
                alt="PostImage"
                className="mt-4 w-full max-h-72 object-contain rounded-lg"
              />
            </div>
          )}

          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[#02282e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
            placeholder="Give a Title to a post"
            value={postData.title || ""}
            onChange={(e) =>
              setPostData((prevPost) => ({
                ...prevPost,
                title: e.target.value,
              }))
            }
          />

          <textarea
            className="w-full p-3 rounded-lg bg-[#02282e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
            rows="4"
            placeholder="Write something interesting..."
            value={postData.description}
            onChange={(e) =>
              setPostData((prevPost) => ({
                ...prevPost,
                description: e.target.value,
              }))
            }
          />

          <button
            type="submit"
            disabled={editLoading}
            className={`w-full flex justify-center group items-center hover-text-border bg-[#00c4cc] text-white font-semibold py-3 rounded-lg hover:bg-[#009fa6] transition-all ${
              editLoading ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {editLoading ? (
              <Loading2 text="Updating..." />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-2xl group-hover:italic">Update Post</span>
                <IoIosSend
                  className="ml-2 group-hover:animate-bounce"
                  size={25}
                />
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
