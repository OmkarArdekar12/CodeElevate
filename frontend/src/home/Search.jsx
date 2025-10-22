import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search({ searchTerm, setSearchTerm }) {
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
          placeholder="Search here..."
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
