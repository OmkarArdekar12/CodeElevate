import FilterSection from "./FilterSection.jsx";
import Search from "./Search.jsx";

export default function SearchSection() {
  return (
    <div className="SearchSection w-[95%] flex justify-center items-center">
      <Search />
      <FilterSection />
    </div>
  );
}
