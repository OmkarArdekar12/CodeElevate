export default function Filter({ text }) {
  return (
    <div className="text-white text-sm border border-gray-500 rounded-full my-1 mx-2 px-5 py-2 text-center hover:bg-green-600 hover:border-green-600">
      <p>{text}</p>
    </div>
  );
}
