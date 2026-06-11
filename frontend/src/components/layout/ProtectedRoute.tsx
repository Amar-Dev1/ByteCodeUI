import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  requireUsername?: boolean;
}

const ProtectedRoute = ({ requireUsername = false }: ProtectedRouteProps) => {
  const { user, backendUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireUsername && backendUser && !backendUser.hasSetUsername) {
    return <Navigate to="/set-username" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
