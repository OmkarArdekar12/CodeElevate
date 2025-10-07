export default function TopCard({ image, text }) {
  return (
    <div className="TopCard group flex items-center justify-center px-7 py-5 w-[26rem] h-45 rounded-lg border border-yellow-200 mx-10 my-1 cursor-pointe transition-all duration-300 ease-in-outr">
      <img src={image} alt={text} className="h-[100%] mx-2" />
      <div>
        <h1 className="font-bold text-4xl">Top</h1>
        <h1 className="font-bold text-4xl group-hover:text-[2.5rem] transition-all duration-300 ease-in-out">
          {text}
        </h1>
      </div>
    </div>
  );
}
