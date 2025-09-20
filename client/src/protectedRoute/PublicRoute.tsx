


import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import type { ReactNode } from "react";

interface PublicRouteProps {
  children?: ReactNode;
  redirectTo?: string;
}

export const PublicRoute = ({ children, redirectTo = "/dashboard" }: PublicRouteProps) => {
  const { token } = useAuth();
  if (token) return <Navigate to={redirectTo} replace />;

  return children ? <>{children}</> : <Outlet />;
};
