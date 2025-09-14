import { useAuth } from "../context/auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useAuth();

  return !token ? <Navigate to="/login" replace /> : <Outlet />;
};

export default ProtectedRoute;
