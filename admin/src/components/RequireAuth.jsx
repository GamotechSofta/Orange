import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Ensures a JWT exists before rendering nested admin routes.
 */
export default function RequireAuth() {
  const location = useLocation();
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
