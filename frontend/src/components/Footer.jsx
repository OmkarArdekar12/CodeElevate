import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { AiOutlineCopyright } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-[100%] bg-black z-1 text-gray-400 py-10 border-t border-cyan-700 transition-all duration-200 ease-in-out">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div onDoubleClick={() => navigate("/")} className="logo-container">
            <img
              src="/images/CodeElevateLogo.png"
              alt="CodeElevate"
              className="logo h-19"
            />
            <h1 className="logo-text text-white text-2xl font-semibold mb-4">
              CodeElevate
            </h1>
          </div>
          <p className="text-sm">
            Elevate your coding journey. Connect with Developers and CP
            enthusiasts. Showcase Competitive Programming and Development
            Progress, and Grow together.
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
              href="https://www.linkedin.com/in/omkarardekar09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/omkarardekar09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.linkedin.com/in/omkarardekar09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/omkarardekar09"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center text-center text-xs text-slate-300 hover:underline cursor-pointer">
        <a
          href="https://github.com/OmkarArdekar12/CodeElevate/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <span>Copyright</span>
          <AiOutlineCopyright className="size-3 mx-1" />
          <span>2025 CodeElevate. All rights reserved.</span>
        </a>
      </div>
    </footer>
  );
}
