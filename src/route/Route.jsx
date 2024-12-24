import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Home from "../layout/Home";
import Register from "@/pages/Register";
import SignIn from "@/pages/SignIn";
import AddService from "@/pages/AddService";
import PrivateRoute from "./PrivateRoute";
import Services from "@/pages/Services";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/service"),
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
    path: "/services",
    element: <Services />,
    loader: () => fetch("http://localhost:5000/service"),
  },
  {
    path: "/add-Service",
    element: (
      <PrivateRoute>
        <AddService />
      </PrivateRoute>
    ),
  },
]);

export default router;
