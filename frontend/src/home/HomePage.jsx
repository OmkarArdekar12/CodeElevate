import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";
import Hero from "./Hero.jsx";
import ProfileSection from "./ProfileSection.jsx";
import SearchSection from "./SearchSection.jsx";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchSection />
      <ProfileSection />
      <Footer />
    </>
  );
}
