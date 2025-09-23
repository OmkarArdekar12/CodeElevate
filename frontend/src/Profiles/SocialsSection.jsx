import React from "react";
import {
  FaLinkedin,
  FaMailBulk,
  FaYoutube,
  FaDiscord,
  FaStackOverflow,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTelegram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";

const SocialsSection = ({ socials }) => {
  return (
    <>
      <div className="w-full flex flex-col justify-center p-4">
        <h2 className="text-3xl mb-1 title-font">Socials</h2>
        <div className="flex flex-row justify-evenly items-center flex-wrap mt-4 p-4 md:px-25">
          <a href="#" className="p-2 m-1">
            <FaLinkedin className="text-3xl md:text-5xl" />
          </a>
          <a href="#" className="p-2 m-1">
            <FaMailBulk className="text-3xl md:text-5xl" />
          </a>
          <a href="#" className="p-2 m-1">
            <FaYoutube className="text-3xl md:text-5xl" />
          </a>
          <a href="#" className="p-2 m-1">
            <FaDiscord className="text-3xl md:text-5xl" />
          </a>
          <a href="#" className="p-2 m-1">
            <FaStackOverflow className="text-3xl md:text-5xl" />
          </a>
          <a href="#" className="p-2 m-1">
            <FaFacebook className="text-3xl md:text-5xl" />
          </a>
          <a href="#" className="p-2 m-1">
            <FaInstagram className="text-3xl md:text-5xl" />
          </a>
          <a href="#" className="p-2 m-1">
            <FaXTwitter className="text-3xl md:text-5xl" />
          </a>
          <a href="#" className="p-2 m-1">
            <FaTelegram className="text-3xl md:text-5xl" />
          </a>
          <a href="#" className="p-2 m-1">
            <CgMoreO className="text-3xl md:text-5xl" />
          </a>
        </div>
      </div>
      <hr className="w-full text-gray-600 my-10" />
    </>
  );
};

export default SocialsSection;
