// components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { ExpContext } from "../context/ExpContext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(ExpContext);
  return token ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
