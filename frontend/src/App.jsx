import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import HomePage from "./home/HomePage.jsx";
import PostPage from "./posts/PostPage.jsx";
import RankingPage from "./rankings/RankingPage.jsx";
import AboutPage from "./about/AboutPage.jsx";
import NotFound from "./NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/rankings" element={<RankingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
