import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-[100%] bg-black text-gray-400 py-10 mt-16 border-t border-cyan-700">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src="/images/logo.png" alt="CodeElevate" className="h-19" />
          <h1 className="text-white text-2xl font-bold mb-4">CodeElevate</h1>
          <p className="text-sm">
            Elevate your coding journey. Connect with developers and CP
            enthusiasts. Showcase projects, compete, grow together.
          </p>
        </div>

        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#explore" className="hover:text-white">
                Explore
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-lg font-semibold mb-4">
            Connect with Us
          </h2>
          <div className="flex space-x-4 text-xl">
            <a href="#" target="_blank" className="hover:text-white">
              <FaGithub />
            </a>
            <a href="#" target="_blank" className="hover:text-white">
              <FaLinkedin />
            </a>
            <a href="#" target="_blank" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        © 2025 CodeElevate. All rights reserved.
      </div>
    </footer>
  );
}
