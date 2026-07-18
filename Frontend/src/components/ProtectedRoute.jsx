import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Guards a route (or group of nested routes) based on auth state.
 *
 * @param {string[]} allowedRoles - roles permitted to access this route,
 *   e.g. ["admin"] or ["student"]. If omitted, just checks "is logged in at all".
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, role } = useSelector((state) => state.auth);

  // Not logged in at all → send to login
  if (!currentUser || !role) {
    return <Navigate to="/" replace />;
  }

  // Logged in, but wrong role → send to login (or a "not authorized" page)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Authorized → render the nested route
  return <Outlet />;
};

export default ProtectedRoute;