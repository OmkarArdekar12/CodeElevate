export default function Hero() {
  return (
    <div
      className="flex text-white items-center justify-evenly w-[95%] h-50 rounded m-10 shadow"
      style={{ backgroundColor: "#212125" }}
    >
      <div className="h-[75%] w-66 rounded bg-cyan-500 shadow-md shadow-cyan-500/50"></div>
      <div className="h-[75%] w-66 rounded bg-blue-500 shadow-md shadow-blue-500/50"></div>
      <div className="h-[75%] w-66 rounded bg-indigo-500 shadow shadow-indigo-500/50"></div>
      <div className="h-[75%] w-66 rounded bg-lime-200 shadow shadow-lime-200/50"></div>
    </div>
  );
}
