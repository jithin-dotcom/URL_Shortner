


// import { Navigate } from "react-router-dom";
// import { useAuth } from "../auth/useAuth";

// export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { token } = useAuth();
//   return token ? children : <Navigate to="/" replace />;
// };











import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children?: ReactNode; // optional if using <Outlet />
  redirectTo?: string;  // optional, default to "/"
}

export const ProtectedRoute = ({
  children,
  redirectTo = "/",
}: ProtectedRouteProps) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  // If children exist, render them; otherwise render <Outlet /> for nested routes
  return children ? <>{children}</> : <Outlet />;
};

