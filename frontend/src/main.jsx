import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <App />
  </StrictMode>
);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { Toaster } from "react-hot-toast";
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Toaster
//       position="top-right"
//       toastOptions={{
//         duration: 3000,
//         style: { background: "#333", color: "#fff" },
//       }}
//     />
//     <App />
//   </StrictMode>
// );
