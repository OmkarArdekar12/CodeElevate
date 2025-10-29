import React from "react";

const ResponsiveDesignFeature = () => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center px-4 gap-2 py-10 text-gray-200">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <img
          src="/about/responsiveness.png"
          alt="Responsiveness Image"
          className="w-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 text-md md:text-xl px-2 md:px-14 gap-3">
        <h2 className="text-xl md:text-3xl font-semibold text-center">
          Responsive Design
        </h2>
        <p>
          The entire CodeElevate website is fully responsive, ensuring an
          optimal viewing experience across all screen sizes and devices. It
          features smooth animations that enhance user interaction without
          overwhelming the interface, combined with a clean and modern UI
          design. This thoughtful combination of responsiveness, fluidity, and
          aesthetics makes the site intuitive and visually appealing whether
          accessed on desktops, tablets, or mobile phones.
        </p>
      </div>
    </div>
  );
};

export default ResponsiveDesignFeature;
