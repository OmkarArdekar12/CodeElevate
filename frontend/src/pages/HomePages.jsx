import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProfilePage from "../Profiles/ProfilePage.jsx";
import { useSession } from "../context/SessionContext.jsx";
import Loading from "../components/Loading.jsx";

function HomePage() {
  const { isLoggedIn, loading } = useSession();
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {/* <main>
        <Outlet />
      </main> */}
      <ProfilePage />
      <Footer />
    </>
  );
}

export default HomePage;

// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "../components/Navbar.jsx";
// import Footer from "../components/Footer.jsx";
// import HomePage from "../home/Home.jsx";
// import PostPage from "../posts/PostPage.jsx";
// import RankingPage from "../rankings/RankingPage.jsx";
// import AboutPage from "../about/AboutPage.jsx";
// import NotFound from "../components/NotFound.jsx";

// function HomePage() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/posts" element={<PostPage />} />
//         <Route path="/rankings" element={<RankingPage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default HomePage;
