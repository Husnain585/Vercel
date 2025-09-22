import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const VendorRoute = ({ children }) => {

  const { user, loadingUser } = useGlobalContext();
  if (loadingUser) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role?.toLowerCase() !== "vendor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
