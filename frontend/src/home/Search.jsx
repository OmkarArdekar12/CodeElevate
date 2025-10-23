import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search({ searchTerm, setSearchTerm }) {
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingForward, setTypingForward] = useState(true);
  const placeholders = [
    "Search here...",
    "Search by fullname...",
    "Search by username...",
    "Search by role...",
    "Search by domain...",
    "Search by tags...",
    "Search by your interest...",
  ];
  const size = placeholders.length;

  useEffect(() => {
    const typingSpeed = 100;
    const pauseTime = 1000;

    const interval = setInterval(
      () => {
        const currentText = placeholders[placeholderIdx];

        if (typingForward) {
          setCharIndex((prev) => {
            if (prev < currentText.length) {
              setPlaceholderText(currentText.slice(0, prev + 1));
              return prev + 1;
            } else {
              setTypingForward(false);
              return prev;
            }
          });
        } else {
          setCharIndex((prev) => {
            if (prev > 0) {
              setPlaceholderText(currentText.slice(0, prev - 1));
              return prev - 1;
            } else {
              setTypingForward(true);
              setPlaceholderIdx((prevIndex) => (prevIndex + 1) % size);
              return 0;
            }
          });
        }
      },
      typingForward && charIndex === placeholders[placeholderIdx].length
        ? pauseTime
        : typingSpeed
    );

    return () => clearInterval(interval);
  }, [charIndex, typingForward, placeholderIdx]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Search my-2 w-full transition-all duration-300 ease-in-out">
      <form
        onSubmit={handleSubmit}
        className="flex justify-evenly items-center text-white border border-cyan-300 rounded text-md p-2"
      >
        <input
          type="text"
          placeholder={placeholderText}
          className="text-white border border-cyan-300 rounded text-md p-2 w-[93%] focus:outline-none focus:ring-1 focus:ring-[#00c4cc]"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-xl text-cyan-300 hover:text-3xl hover:text-[#00c4cc] cursor-pointer ml-1"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
