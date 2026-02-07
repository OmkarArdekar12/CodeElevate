import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaYoutube,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { AiOutlineCopyright } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-[100%] bg-black z-1 text-gray-400 py-10 border-t border-cyan-700 transition-all duration-200 ease-in-out">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div
            onDoubleClick={() => navigate("/")}
            className="logo-container"
            aria-label="Double click to go homepage"
          >
            <img
              src="/images/CodeElevateLogo.png"
              alt="CodeElevate - Competitive Programming and Developer Showcase Platform"
              className="logo h-19"
            />
            <h1 className="logo-text text-white text-2xl font-semibold mb-4">
              CodeElevate
            </h1>
          </div>
          <p className="text-sm">
            Elevate your coding journey. Connect with Developers and CP
            enthusiasts. Showcase Competitive Programming and Development
            Progress, and Grow together.{" "}
            <a
              href="https://omkarardekar12.github.io/CodeElevate/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-wrap items-center gap-1 hover:text-white hover:underline"
            >
              Visit CodeElevate Portal{" "}
              <FaExternalLinkAlt className="size-3 inline" />
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/posts" className="hover:text-white">
                Explore
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-lg font-semibold mb-4">
            Connect with Us
          </h2>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://github.com/OmkarArdekar12/CodeElevate"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="View CodeElevate GitHub repository (opens in new tab)"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/omkarardekar09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Visit LinkedIn profile (opens in new tab)"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.youtube.com/watch?v=4-Udx0xvsO0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Watch CodeElevate demo video (opens in new tab)"
            >
              <FaYoutube />
            </a>
            <a
              href="https://github.com/OmkarArdekar12"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Visit GitHub profile (opens in new tab)"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/@OmkarArdekar012"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Contact via email or YouTube channel (opens in new tab)"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-2 items-center justify-center text-center text-xs text-slate-300">
        <a
          href="https://github.com/OmkarArdekar12/CodeElevate/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-wrap items-center justify-center hover:underline hover:text-white cursor-pointer"
          aria-label="View License (opens in new tab)"
        >
          <span>Copyright</span>
          <AiOutlineCopyright className="size-3 mx-1" />
          <span>
            {new Date().getFullYear()} CodeElevate. All rights reserved.
          </span>
        </a>
        <a
          href="https://www.linkedin.com/in/omkarardekar09"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-4 text-xs text-slate-400"
          aria-label="Visit Omkar Ardekar LinkedIn profile (opens in new tab)"
        >
          Created by{" "}
          <span className="text-white group-hover:underline group-hover:text-orange-500">
            Omkar Ardekar
          </span>
        </a>
      </div>
    </footer>
  );
}

// import {
//   FaGithub,
//   FaLinkedin,
//   FaTwitter,
//   FaEnvelope,
//   FaYoutube,
//   FaExternalLinkAlt,
// } from "react-icons/fa";
// import { AiOutlineCopyright } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";

// export default function Footer() {
//   const navigate = useNavigate();
//   return (
//     <footer className="w-[100%] bg-black z-1 text-gray-400 py-10 border-t border-cyan-700 transition-all duration-200 ease-in-out">
//       <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div>
//           <div
//             onDoubleClick={() => navigate("/")}
//             className="logo-container"
//             aria-label="Double click to go homepage"
//           >
//             <img
//               src="/images/CodeElevateLogo.png"
//               alt="CodeElevate Logo Image"
//               className="logo h-19"
//             />
//             <h1 className="logo-text text-white text-2xl font-semibold mb-4">
//               CodeElevate
//             </h1>
//           </div>
//           <p className="text-sm">
//             Elevate your coding journey. Connect with Developers and CP
//             enthusiasts. Showcase Competitive Programming and Development
//             Progress, and Grow together.{" "}
//             <a
//               href="https://omkarardekar12.github.io/CodeElevate/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex flex-wrap items-center gap-1 hover:text-white hover:underline"
//             >
//               Visit CodeElevate Portal{" "}
//               <FaExternalLinkAlt className="size-3 inline" />
//             </a>
//           </p>
//         </div>

//         <div>
//           <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <Link to="/" className="hover:text-white">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className="hover:text-white">
//                 About
//               </Link>
//             </li>
//             <li>
//               <Link to="/posts" className="hover:text-white">
//                 Explore
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h2 className="text-white text-lg font-semibold mb-4">
//             Connect with Us
//           </h2>
//           <div className="flex space-x-4 text-xl">
//             <a
//               href="https://github.com/OmkarArdekar12/CodeElevate"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-white"
//               aria-label="View CodeElevate GitHub repository (opens in new tab)"
//             >
//               <FaGithub />
//             </a>
//             <a
//               href="https://www.linkedin.com/in/omkarardekar09"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-white"
//               aria-label="Visit LinkedIn profile (opens in new tab)"
//             >
//               <FaLinkedin />
//             </a>
//             <a
//               href="https://www.youtube.com/watch?v=4-Udx0xvsO0"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-white"
//               aria-label="Watch CodeElevate demo video (opens in new tab)"
//             >
//               <FaYoutube />
//             </a>
//             <a
//               href="https://github.com/OmkarArdekar12"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-white"
//               aria-label="Visit GitHub profile (opens in new tab)"
//             >
//               <FaTwitter />
//             </a>
//             <a
//               href="https://www.youtube.com/@OmkarArdekar012"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-white"
//               aria-label="Contact via email or YouTube channel (opens in new tab)"
//             >
//               <FaEnvelope />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="mt-10 flex items-center justify-center text-center text-xs text-slate-300 hover:underline cursor-pointer hover:text-white">
//         <a
//           href="https://github.com/OmkarArdekar12/CodeElevate/blob/main/LICENSE"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center"
//           aria-label="View License (opens in new tab)"
//         >
//           <span>Copyright</span>
//           <AiOutlineCopyright className="size-3 mx-1" />
//           <span>2025 CodeElevate. All rights reserved.</span>
//         </a>
//       </div>
//     </footer>
//   );
// }
