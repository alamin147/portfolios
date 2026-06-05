import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ADMIN_BASE } from "./config";

/**
 * Decodes a JWT payload without an external dependency.
 * Returns null if the token is malformed.
 */
function decodeToken(token: string): { username?: string } | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(decodeURIComponent(escape(atob(normalized))));
  } catch {
    return null;
  }
}

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={ADMIN_BASE} replace={true} />;
  }

  const decoded = decodeToken(token);
  if (!decoded?.username) {
    return <Navigate to={ADMIN_BASE} replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
