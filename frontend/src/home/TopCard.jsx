export default function TopCard({ image, text }) {
  return (
    <div
      className="flex items-center justify-center bg-gradient-to-r from-black-600 to-black-700 py-8 w-[26rem] h-45 rounded-lg border border-yellow-200 mx-10"
      style={{ boxShadow: "0px 0px 10px #fde047" }}
    >
      <img src={image} alt={text} className="h-[100%] mx-2" />
      <div>
        <h1 className="font-bold text-4xl">Top</h1>
        <h1 className="font-bold text-4xl">{text}</h1>
      </div>
    </div>
  );
}
