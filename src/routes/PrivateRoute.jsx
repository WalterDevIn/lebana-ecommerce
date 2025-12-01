import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, isAuth, roles = [], user }) {

  if (!isAuth) return <Navigate to="/user" replace />;

  if (roles.length > 0 && !roles.includes(user?.Type_user)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
