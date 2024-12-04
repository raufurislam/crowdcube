import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import router from "./routes/router.jsx";
import AuthProviders from "./provider/AuthProviders.jsx";

// Suppress specific React Router warnings in development
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes("React Router Future Flag Warning")) {
    return; // Ignore React Router warnings
  }
  originalWarn(...args);
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position="top-center" autoClose={3000} />
    </AuthProviders>
  </StrictMode>
);
