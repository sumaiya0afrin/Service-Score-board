import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./route/Route.jsx";
import { Provider } from "./components/ui/provider";
import AuthProvider from "./authProvider/AuthProvider";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
