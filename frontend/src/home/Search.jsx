import { useState } from "react";

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
        className="flex flex-wrap justify-center items-center"
      >
        <input
          type="text"
          placeholder="Search here..."
          className="text-white border border-cyan-300 rounded text-md p-2 w-[90%]"
          value={val}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-white border border-cyan-300 rounded p-2 hover:bg-white hover:border-white hover:text-green-700"
        >
          <i className="fa-solid fa-magnifying-glass text-xl"></i>
        </button>
      </form>
    </div>
  );
}
