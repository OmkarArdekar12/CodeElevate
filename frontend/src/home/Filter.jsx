export default function Filter({ text, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`text-white text-sm border rounded-full my-1 mx-1 lg:mx-2 px-5 py-2 text-center cursor-pointer transition-all duration-300 ease-in-out
        ${
          active
            ? "bg-green-600 border-green-600 font-semibold"
            : "border-gray-500 hover:bg-green-600 hover:border-green-600"
        }`}
    >
      <p>{text}</p>
    </div>
  );
}
