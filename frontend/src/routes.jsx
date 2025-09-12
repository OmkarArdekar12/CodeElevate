import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Error from "./components/Error.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./home/HomePage.jsx";
import PostPage from "./posts/PostPage.jsx";
import RankingPage from "./rankings/RankingPage.jsx";
import AboutPage from "./about/AboutPage.jsx";
import NotFound from "./components/NotFound.jsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
]);

// <Route path="/" element={<HomePage />} />
// <Route path="/posts" element={<PostPage />} />
// <Route path="/rankings" element={<RankingPage />} />
// <Route path="/about" element={<AboutPage />} />
// <Route path="*" element={<NotFound />} />
