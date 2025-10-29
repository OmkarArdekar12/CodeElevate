import React from "react";

const ProfileSystem = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 gap-2 py-10 text-gray-200">
      <div className="flex flex-col items-center justify-center w-full text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          User Profile System
        </h2>
        <p>
          User profiles in CodeElevate are comprehensive representations of each
          user, showcasing their personal identity, skills, and online presence
          through various features. Profiles include essential details such as
          full name, username, profile picture, background banner, headline,
          role, domain, and a user about section. Users can add and edit
          multiple tags to highlight their areas of expertise or interest. These
          profiles seamlessly integrate competitive programming accounts
          (LeetCode, Codeforces, AtCoder, CodeChef, GeeksforGeeks, HackerRank)
          and development/version control profiles (GitHub, GitLab, portfolio
          URL). Social media links are supported for platforms like LinkedIn,
          Twitter, Instagram, Discord, StackOverflow, Telegram, YouTube,
          Facebook, and others to present a well-connected online identity.
          Education details including degree, CGPA, and institution enable users
          to showcase their academic background. The system tracks followers and
          following to demonstrate social connections within the community, with
          users controlling the visibility of their stats. The profile supports
          editable fields and allows image uploads for profile pictures and
          background banners, ensuring personalization. Importantly, user
          profiles are designed with a highly responsive layout, smooth
          animations, and an aesthetically pleasing UI, guaranteeing a seamless
          and engaging experience across all devices. This rich and dynamic
          profile system offers a holistic view of each user's coding journey,
          skill set, and network, enhancing community interaction and
          professional visibility on CodeElevate.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-2">
        <img
          src="/about/profilePreview.png"
          alt="Profile Preview Image"
          className="w-full md:w-1/2"
        />
        <img
          src="/about/profileStatsPreview.png"
          alt="Profile Stats Image"
          className="w-full md:w-1/2"
        />
      </div>
    </div>
  );
};

export default ProfileSystem;
