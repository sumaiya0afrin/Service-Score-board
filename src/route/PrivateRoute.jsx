import { AuthContext } from "@/authProvider/AuthProvider";
import Loading from "@/pages/Loading";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to={"/signIn"}></Navigate>;
};

export default PrivateRoute;
