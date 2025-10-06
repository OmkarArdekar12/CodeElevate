import PostsList from "./PostsList.jsx";

export default function PostPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-white py-4 px-2 md:px-10 mb-5">
      <div className="w-full flex">
        <h1 className="text-3xl hover-text-border text-gray-100">All Posts</h1>
      </div>
      <PostsList />
    </div>
  );
}
