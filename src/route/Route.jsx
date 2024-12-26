import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import Home from "../layout/Home";
import Register from "@/pages/Register";
import SignIn from "@/pages/SignIn";
import AddService from "@/pages/AddService";
import PrivateRoute from "./PrivateRoute";
import Services from "@/pages/Services";
import ServiceDetails from "@/pages/ServiceDetails";
import MyServices from "@/pages/MyServices";
import MyReview from "@/pages/MyReview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/feature-service"),
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
    path: "/my-service",
    element: (
      <PrivateRoute>
        <MyServices />
      </PrivateRoute>
    ),
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
  {
    path: "/my-review",
    element: (
      <PrivateRoute>
        <MyReview />
      </PrivateRoute>
    ),
    loader: () => fetch("http://localhost:5000/review"),
  },
  {
    path: "/service-details/:id",
    element: (
      <PrivateRoute>
        <ServiceDetails />
      </PrivateRoute>
    ),
    loader: ({ params }) => fetch(`http://localhost:5000/service/${params.id}`),
  },
]);

export default router;
