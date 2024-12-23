import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Home from "../layout/Home";
import Register from "@/pages/Register";
import SignIn from "@/pages/SignIn";
import AddService from "@/pages/AddService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/add-Service",
    element: <AddService />,
  },
]);

export default router;
