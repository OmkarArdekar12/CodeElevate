import PostsList from "./PostsList.jsx";

export default function PostPage() {
  return (
    <div className="text-white w-full flex flex-col justify-center px-12 py-5">
      <h1 className="text-3xl text-border">All Posts</h1>
      <PostsList />
    </div>
  );
}
