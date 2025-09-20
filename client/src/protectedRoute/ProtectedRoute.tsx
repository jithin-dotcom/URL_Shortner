

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children?: ReactNode; 
  redirectTo?: string;  
}

export const ProtectedRoute = ({
  children,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

