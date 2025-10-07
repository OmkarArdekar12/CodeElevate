import React, { useState } from "react";
import { createPost } from "../service/postApi";
import toast from "react-hot-toast";
import { ImagePlus, Loader2 } from "lucide-react";
import Loading2 from "../components/Loading2";
import { IoIosSend } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const previousUrl = location.state?.from || "/";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please add a Title to a Post!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }
      const response = await createPost(formData);
      toast.success("Post created successfully");
      setImage(null);
      setPreview("");
      setTitle("");
      setDescription("");
      navigate(previousUrl);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#01161e] text-white px-4 py-8 transition-all duration-300 ease-in-out">
      <div className="bg-[#03393f] p-6 rounded-2xl shadow-md w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl font-semibold mb-6 text-center">Create Post</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-4 hover:border-[#00c4cc] transition-all">
            <label className="cursor-pointer flex flex-col items-center text-gray-400">
              <ImagePlus className="w-10 h-10 mb-2" />
              <span>Click to upload image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {preview && (
              <img
                src={preview}
                alt="ImagePreview"
                className="mt-4 w-full max-h-72 object-contain rounded-lg"
              />
            )}
          </div>

          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[#02282e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
            placeholder="Give a Title to a post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded-lg bg-[#02282e] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
            rows="4"
            placeholder="Write something interesting..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center group items-center hover-text-border bg-[#00c4cc] text-white font-semibold py-3 rounded-lg hover:bg-[#009fa6] transition-all ${
              loading ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <Loading2 text="Posting..." />
            ) : (
              <div className="flex items-center justify-center">
                <span className="text-2xl group-hover:italic">Post</span>
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

export default CreatePostPage;
