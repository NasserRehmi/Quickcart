import React from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authToken");
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}
export default PublicRoute;
