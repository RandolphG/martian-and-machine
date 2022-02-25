import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * PrivateRoute
 * @param {React.Component} Component
 * @returns {React.Component}
 */
export function PrivateRoute({ children }: any) {
  let location = useLocation();

  const navigateTo = {
    pathname: "/app",
    state: { from: location },
  };

  function useAuth() {
    return true;
  }

  const isAuthenticated = useAuth();

  return isAuthenticated ? children : <Navigate to={navigateTo} />;
}
