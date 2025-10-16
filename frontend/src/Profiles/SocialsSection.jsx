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
  if (!socials) {
    return null;
  }
  const linkedinLink = socials.linkedin;
  const emailLink = socials.email;
  const youtubeLink = socials.youtube;
  const discordLink = socials.discord;
  const stackoverflowLink = socials.stackoverflow;
  const facebookLink = socials.facebook;
  const instagramLink = socials.instagram;
  const twitterxLink = socials.twitterx;
  const telegramLink = socials.telegram;
  const othersLink = socials.others;
  const hasAny =
    linkedinLink ||
    emailLink ||
    youtubeLink ||
    discordLink ||
    stackoverflowLink ||
    facebookLink ||
    instagramLink ||
    twitterxLink ||
    telegramLink ||
    othersLink;

  return (
    <>
      {hasAny && (
        <>
          <div className="w-full flex flex-col justify-center p-4 transition-all duration-300 ease-in-out">
            <h2 className="text-2xl md:text-3xl mb-1 title-font">Socials</h2>
            <div className="flex flex-row justify-center items-center flex-wrap mt-4 p-4 md:px-14">
              {linkedinLink && (
                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <FaLinkedin className="text-gray-300 hover:text-[#0A66C2] text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
              {emailLink && (
                <a
                  href={emailLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <FaMailBulk className="text-gray-300 hover:text-yellow-200 text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
              {youtubeLink && (
                <a
                  href={youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <FaYoutube className="text-gray-300 hover:text-[#FF0000] text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
              {discordLink && (
                <a
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <FaDiscord className="text-gray-300 hover:text-[#5865F2] text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
              {stackoverflowLink && (
                <a
                  href={stackoverflowLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <FaStackOverflow className="text-gray-300 hover:text-[#F48024] text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
              {facebookLink && (
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <FaFacebook className="text-gray-300 hover:text-[#1877F2] text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <FaInstagram className="text-gray-300 hover:text-[#E1306C] text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
              {twitterxLink && (
                <a
                  href={twitterxLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <FaXTwitter className="text-gray-300 hover:text-[#1DA1F2] text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
              {telegramLink && (
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <FaTelegram className="text-gray-300 hover:text-[#26A5E4] text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
              {othersLink && (
                <a
                  href={othersLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 m-1"
                >
                  <CgMoreO className="text-gray-300 hover:text-gray-500 text-xl md:text-3xl hover:drop-shadow-[0_0_15px_#f87171] transition-all duration-200" />
                </a>
              )}
            </div>
          </div>
          <hr className="w-full text-gray-600 my-10" />
        </>
      )}
    </>
  );
};

export default SocialsSection;
