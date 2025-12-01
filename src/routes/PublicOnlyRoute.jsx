import { Navigate } from "react-router-dom";

export default function PublicOnlyRoute({ children, isAuth }) {
  if (isAuth) return <Navigate to="/profile" replace />;
  return children;
}
