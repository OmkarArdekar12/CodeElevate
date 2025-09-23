import { Link, useNavigate } from "react-router-dom";

export default function Profile({ profile }) {
  const navigate = useNavigate();
  const userId = profile.user._id;
  const userImage = profile.profilePicture || "/images/userImage.png";
  const headLine = profile.headLine ? profile.headLine : "Hello! Everyone";
  const username = profile.user.username;
  const role = profile.role ? profile.role : "Explorer";
  const domain = profile.domain ? profile.domain : "General";
  const tags = profile.tags;
  return (
    <div className="Profile flex flex-wrap w-[100%] text-xl items-center justify-between bg-gradient-to-r from-gray-950 to-blue-900 rounded-xl px-10 py-2 my-4 shadow-sm shadow-slate-500/50">
      <div className="profile-image flex flex-wrap items-center justify-evenly">
        <img src={userImage} alt={username} className="w-[5rem]" />
        <div className="flex flex-col justify-center">
          <p className="mx-2 hover-text-border">{username}</p>
          {headLine && <p className="mx-2 text-xs">{headLine}</p>}
        </div>
      </div>
      <div className="profile-description flex flex-wrap items-center">
        <div className="m-1 flex flex-wrap items-center justify-center">
          <p className="m-1 bg-gray-600 py-2 px-4 rounded-2xl italic text-sm hover-text-border">
            {role}
          </p>
          <p className="m-1 bg-gray-600 py-2 px-4 rounded-2xl italic text-sm hover-text-border">
            {domain}
          </p>
        </div>
        {tags && tags.length !== 0 && (
          <div className="m-1 flex flex-wrap flex-row justify-center">
            {tags.map((tag, index) => (
              <p
                key={index}
                className="m-[1px] bg-gray-700 px-4 py-2 rounded-3xl text-sm hover-text-border"
              >
                {tag}
              </p>
            ))}
          </div>
        )}
        <button
          className="m-2 bg-blue-700 px-6 py-2 rounded-full hover:bg-green-700 hover:border-green-700 hover-text-border"
          onClick={() => navigate(`/profiles/${userId}`)}
        >
          Visit
        </button>
      </div>
    </div>
  );
}
