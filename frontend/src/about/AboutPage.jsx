import Hero from "./Hero.jsx";
import Logo3D from "../components/Logo3D.jsx";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-white pt-14 py-4 px-2 md:px-10 mb-5 transition-all duration-300 ease-in-out">
      <Hero />
      <Logo3D width="500px" height="550px" />
    </div>
  );
}
