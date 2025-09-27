import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [val, setVal] = useState("");

  const handleChange = (event) => {
    setVal(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(val);
    setVal("");
  };

  return (
    <div className="Search my-2 w-[60%]">
      <form
        onSubmit={handleSubmit}
        className="flex justify-evenly items-center text-white border border-cyan-300 rounded text-md p-2"
      >
        <input
          type="text"
          placeholder="Search here..."
          className="text-white border border-cyan-300 rounded text-md p-2 w-[93%]"
          value={val}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-xl text-cyan-300 hover:text-3xl hover:text-white cursor-pointer ml-1"
        >
          <FaSearch />
        </button>
      </form>
    </div>
  );
}
