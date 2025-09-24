import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Setup2FA from "./pages/Setup2FA.jsx";
import Verify2FA from "./pages/Verify2FA.jsx";
import Error from "./components/Error.jsx";
import HomePage from "./pages/HomePage.jsx";
import Home from "./home/Home.jsx";
import PostPage from "./posts/PostPage.jsx";
import ProfilePage from "./profiles/ProfilePage.jsx";
import EditProfilePage from "./profiles/EditProfilePage.jsx";
import NotificationPage from "./notifications/NotificationPage.jsx";
import MessagePage from "./messages/MessagePage.jsx";
import RankingPage from "./rankings/RankingPage.jsx";
import AboutPage from "./about/AboutPage.jsx";
import NotFound from "./components/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
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
    children: [
      {
        index: true,
        element: <Home />, //default route "/"
      },
      {
        path: "/profiles/:id",
        element: <ProfilePage />,
      },
      {
        path: "/posts",
        element: <PostPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/notifications",
            element: <NotificationPage />,
          },
          {
            path: "/messages",
            element: <MessagePage />,
          },
          {
            path: "/profiles/:id/edit",
            element: <EditProfilePage />,
          },
        ],
      },
      {
        path: "/rankings",
        element: <RankingPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
