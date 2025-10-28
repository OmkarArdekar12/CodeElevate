import React from "react";

const ProfileOptions = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center px-4 gap-2 py-10 text-gray-200">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/about/profileOptions.png"
          alt="Authentication Image"
          className="w-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-xl px-2 md:px-14 gap-3">
        <h2 className="text-3xl font-semibold text-center">
          User Profile Options
        </h2>
        <p>
          User profiles on CodeElevate are comprehensive and interactive,
          focusing on easy social engagement and user control. Users can view
          their connections including followers, following, and connections.
          Offering clear insights into their network for fostering meaningful
          interactions. For account management, users can see their account
          status, including profile creation and last updated timestamps, to
          keep track of their profile activity. They also have straightforward
          options to logout or delete their account, providing essential
          controls over their presence on the platform. Additionally, users can
          create posts to share updates, achievements, or thoughts, encouraging
          active participation and content sharing within the community. These
          features make user profiles dynamic hubs for personal branding,
          networking, and communication, aligned with CodeElevate's mission to
          connect coders worldwide.
        </p>
      </div>
    </div>
  );
};

export default ProfileOptions;
