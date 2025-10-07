import FilterSection from "./FilterSection.jsx";
import Search from "./Search.jsx";

export default function SearchSection() {
  return (
    <div className="SearchSection w-[95%] flex justify-center items-center transition-all duration-300 ease-in-out">
      <Search />
      <FilterSection />
    </div>
  );
}
