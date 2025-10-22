import Filter from "./Filter.jsx";

export default function FilterSection({ selectedFilter, setSelectedFilter }) {
  const filters = [
    "Trending",
    "CP/DSA",
    "DEVS",
    "Experienced",
    "Professionals",
  ];
  return (
    <div className="FilterSection w-full md:flex-1 flex flex-wrap md:flex-nowrap justify-center items-center transition-all duration-300 ease-in-out">
      {filters.map((f) => (
        <Filter
          text={f}
          active={selectedFilter === f}
          onClick={() => setSelectedFilter(f === selectedFilter ? "" : f)}
          key={f}
        />
      ))}
    </div>
  );
}
