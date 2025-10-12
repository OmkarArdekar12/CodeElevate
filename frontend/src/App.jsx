import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { SessionProvider } from "./context/SessionContext.jsx";

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
