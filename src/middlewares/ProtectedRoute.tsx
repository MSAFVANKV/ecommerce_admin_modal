import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./IsAuthenticated";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLogged = isAuthenticated();
  const { pathname } = useLocation();

  if (!isLogged) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // Redirect to dashboard if logged in and accessing "/" or "/login"
  if (pathname === "/login" || pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }

  // Allow authenticated users to access protected routes
  return <>{children}</>;
};

export default ProtectedRoute;
