import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProfilePage from "../Profiles/ProfilePage.jsx";
import LeetCodeCardStats from "../components/LeetCodeCardStats.jsx";
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
      <LeetCodeCardStats leetCodeData={data} />
      <Footer />
    </>
  );
}

const data = {
  username: "Omkaarr_01",
  totalLeetCodeUsers: 5000001,
  ranking: 25600,
  easySolved: 280,
  mediumSolved: 547,
  hardSolved: 151,
  totalSolved: 978,
  numberOfBadges: 28,
  badgeNames: [
    "Submission Badge",
    "Submission Badge",
    "Annual Badge",
    "Annual Badge",
    "Annual Badge",
    "Annual Badge",
    "Annual Badge",
    "Annual Badge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Daily Coding Challenge",
    "Study Plan V2 Award",
    "Study Plan V2 Award",
    "Study Plan V2 Award",
    "Study Plan V2 Award",
  ],
  hasKnight: false,
  hasGuardian: false,
  maxStreak: 365,
  totalActiveDays: 365,
  contestRating: 1601.555,
  contestRank: 169828,
  totalContestParticipants: 754079,
  topPercentage: 22.92,
  topGlobalPercentage: 0.005119998976000205,
  contestBadge: null,
  contestsAttended: 38,
};

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
