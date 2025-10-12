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

// import "./App.css";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes.jsx";
// import { SessionProvider } from "./context/SessionContext.jsx";
// function App() {
//   return (
//     <SessionProvider>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 3000,
//           style: { background: "#333", color: "#fff" },
//         }}
//       />
//       <RouterProvider router={router} />
//     </SessionProvider>
//   );
// }
// export default App;
