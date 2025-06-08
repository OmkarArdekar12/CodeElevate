import Filter from "./Filter.jsx";

export default function FilterSection() {
  return (
    <div className="FilterSection w-[45%] flex flex-wrap justify-center items-center">
      <Filter text={"Trending"} />
      <Filter text={"Student"} />
      <Filter text={"Professionals"} />
      <Filter text={"DSA"} />
      <Filter text={"Development"} />
    </div>
  );
}
