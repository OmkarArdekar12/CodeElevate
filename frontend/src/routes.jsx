import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Setup2FA from "./pages/Setup2FA.jsx";
import Verify2FA from "./pages/Verify2FA.jsx";
import Error from "./components/Error.jsx";
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

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/setup-2fa",
        element: <Setup2FA />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <Verify2FA />,
        errorElement: <Error />,
      },
    ],
  },

  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },

  {
    path: "/posts",
    element: <PostPage />,
    errorElement: <Error />,
  },

  {
    path: "/rankings",
    element: <RankingPage />,
    errorElement: <Error />,
  },

  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <Error />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
