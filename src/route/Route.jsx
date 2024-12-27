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
import Error from "@/components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch(
            "https://service-score-board-server.vercel.app/feature-service"
          ),
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
        loader: () =>
          fetch("https://service-score-board-server.vercel.app/service"),
      },
      {
        path: "/my-service",
        element: (
          <PrivateRoute>
            <MyServices />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://service-score-board-server.vercel.app/service"),
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
        loader: () =>
          fetch("https://service-score-board-server.vercel.app/review"),
      },
      {
        path: "/service-details/:id",
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://service-score-board-server.vercel.app/service/${params.id}`
          ),
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
