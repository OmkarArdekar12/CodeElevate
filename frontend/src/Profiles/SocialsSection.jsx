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
  const isEmpty =
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
      {isEmpty && (
        <>
          <div className="w-full flex flex-col justify-center p-4 mb-3">
            <h2 className="text-3xl mb-1 title-font">Socials</h2>
            <div className="flex flex-row justify-evenly items-center flex-wrap mt-4 p-4 md:px-25">
              {linkedinLink && (
                <a href={linkedinLink} className="p-2 m-1">
                  <FaLinkedin className="text-gray-200 hover:text-[#0A66C2] text-3xl md:text-5xl" />
                </a>
              )}
              {emailLink && (
                <a href={emailLink} className="p-2 m-1">
                  <FaMailBulk className="text-gray-200 hover:text-yellow-200 text-3xl md:text-5xl" />
                </a>
              )}
              {youtubeLink && (
                <a href={youtubeLink} className="p-2 m-1">
                  <FaYoutube className="text-gray-200 hover:text-[#FF0000] text-3xl md:text-5xl" />
                </a>
              )}
              {discordLink && (
                <a href={discordLink} className="p-2 m-1">
                  <FaDiscord className="text-gray-200 hover:text-[#5865F2] text-3xl md:text-5xl" />
                </a>
              )}
              {stackoverflowLink && (
                <a href={stackoverflowLink} className="p-2 m-1">
                  <FaStackOverflow className="text-gray-200 hover:text-[#F48024] text-3xl md:text-5xl" />
                </a>
              )}
              {facebookLink && (
                <a href={facebookLink} className="p-2 m-1">
                  <FaFacebook className="text-gray-200 hover:text-[#1877F2] text-3xl md:text-5xl" />
                </a>
              )}
              {instagramLink && (
                <a href={instagramLink} className="p-2 m-1">
                  <FaInstagram className="text-gray-200 hover:text-[#E1306C] text-3xl md:text-5xl" />
                </a>
              )}
              {twitterxLink && (
                <a href={twitterxLink} className="p-2 m-1">
                  <FaXTwitter className="text-gray-200 hover:text-[#1DA1F2] text-3xl md:text-5xl" />
                </a>
              )}
              {telegramLink && (
                <a href={telegramLink} className="p-2 m-1">
                  <FaTelegram className="text-gray-200 hover:text-[#26A5E4] text-3xl md:text-5xl" />
                </a>
              )}
              {othersLink && (
                <a href={othersLink} className="p-2 m-1">
                  <CgMoreO className="text-gray-200 hover:text-gray-500 text-3xl md:text-5xl" />
                </a>
              )}
            </div>
          </div>
        </>
      )}{" "}
    </>
  );
};

export default SocialsSection;
