export default function Profile({ user }) {
  const userImage = user.image ? user.image : "/images/userImage.png";
  const headLine = user.headLine ? user.headLine : "Hello! Everyone";
  const username = user.name;
  const role = user.role;
  const domain = user.domain;
  const tags = ["Coder", "Learner", "Speed"];
  return (
    <div className="Profile flex flex-wrap w-[100%] text-xl items-center justify-between bg-gradient-to-r from-gray-950 to-blue-900 rounded-xl px-10 py-2 my-4 shadow-sm shadow-slate-500/50">
      <div className="flex flex-wrap items-center justify-evenly">
        <img src={userImage} alt={username} className="w-[5rem]" />
        <div className="flex flex-col justify-center">
          <p className="my-1 mx-5 mr-10">{username}</p>
          {headLine && <p className="my-1 mx-5 mr-10 text-xs">{headLine}</p>}
        </div>
      </div>
      <div className="flex flex-wrap items-center">
        <div className="flex items-center">
          <p className="my-1 mx-2 bg-gray-600 p-2 px-4 rounded-2xl italic text-sm">
            {role}
          </p>
          <p className="my-1 mx-2 bg-gray-600 p-2 px-4 rounded-2xl italic text-sm">
            {domain}
          </p>
        </div>
        {tags && (
          <div className="flex items-center">
            {tags.map((tag, index) => {
              <p
                key={index}
                className="my-1 mx-2 bg-gray-600 p-2 px-4 rounded-2xl italic text-sm"
              >
                {tag}
              </p>;
            })}
          </div>
        )}
        <button className="my-1 ml-8 bg-blue-700 px-6 py-2 rounded-full hover:bg-green-700 hover:border-green-700">
          Visit
        </button>
      </div>
    </div>
  );
}
