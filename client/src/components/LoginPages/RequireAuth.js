import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

export default function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to="/" state={{ path: location.pathname }}></Navigate>;
  }
  return children;
}
