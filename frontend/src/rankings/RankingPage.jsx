import RankingList from "./RankingList.jsx";

export default function RankingPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-white py-4 px-2 md:px-10 mb-5 transition-all duration-300 ease-in-out">
      <div className="w-full flex">
        <h1 className="text-3xl hover-text-border text-gray-100">
          All Rankings
        </h1>
      </div>
      <RankingList />
    </div>
  );
}
