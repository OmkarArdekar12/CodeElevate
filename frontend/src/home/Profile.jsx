import { Link, useNavigate } from "react-router-dom";

export default function Profile({ profile }) {
  const navigate = useNavigate();
  if (!profile) {
    return null;
  }
  const userId = profile.user._id;
  const userImage = profile.profilePicture || "/images/defaultUserImage.png";
  const headLine = profile.headLine ? profile.headLine : "Hello! Everyone";
  const fullName = profile.fullName;
  const username = profile.user.username;
  const role = profile.role ? profile.role : "";
  const domain = profile.domain ? profile.domain : "";
  const tags = profile.tags;
  return (
    <div
      onDoubleClick={() => navigate(`/profiles/${userId}`)}
      className="Profile border border-slate-600 flex flex-col flex-wrap sm:flex-row md:flex-nowrap justify-center w-[100%] text-xl items-center bg-gradient-to-r from-gray-950 to-blue-900 rounded-xl px-10 py-2 my-4 shadow-sm shadow-slate-500/50 cursor-pointer transition-all duration-300 ease-in-out"
    >
      <div className="w-full flex flex-col gap-1 items-center justify-center sm:flex-row sm:justify-between rounded-xl">
        <div className="flex flex-col flex-wrap sm:flex-row md:flex-nowrap items-center justify-evenly">
          <img
            src={userImage}
            alt={username}
            className="w-[10rem] h-[10rem] md:w-[5rem] md:h-[5rem] rounded-full"
          />
          <div className="flex flex-col justify-center items-center sm:items-start">
            {fullName && <p className="mx-2 hover-text-border">{fullName}</p>}
            <p className="mx-2 hover-text-border text-xs italic">@{username}</p>
            {headLine && <p className="mx-2 text-xs">{headLine}</p>}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-wrap md:flex-row">
          <div className="inline-flex flex-wrap items-center justify-center sm:justify-end">
            <div className="m-1 inline-flex flex-wrap items-center justify-center">
              {role && (
                <p className="m-[1px] bg-gray-600 py-2 px-4 rounded-2xl italic text-sm hover-text-border">
                  {role}
                </p>
              )}
              {domain && (
                <p className="m-[1px] bg-gray-600 py-2 px-4 rounded-2xl italic text-sm hover-text-border">
                  {domain}
                </p>
              )}
            </div>
            {tags && tags.length !== 0 && (
              <div className="inline-flex m-1 flex-wrap items-center justify-center sm:justify-end">
                {tags.map((tag, index) =>
                  tag ? (
                    <p
                      key={index}
                      className="m-[1px] bg-gray-700 px-3 py-2 rounded-3xl text-sm hover-text-border"
                    >
                      {tag}
                    </p>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className="inline-flex w-[95%] md:w-[12%] items-center justify-center m-1 bg-blue-700 px-6 py-2 rounded-full hover:bg-blue-500 hover:border hover:border-blue-500 hover-text-border cursor-pointer"
        onClick={() => navigate(`/profiles/${userId}`)}
      >
        Visit
      </button>
    </div>
  );
}
