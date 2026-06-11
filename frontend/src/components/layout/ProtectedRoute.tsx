import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  requireUsername?: boolean;
}

const ProtectedRoute = ({ requireUsername = false }: ProtectedRouteProps) => {
  const { user, backendUser, backendError, isLoading } = useAuth();

  // Show spinner only while initial auth is resolving
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Not authenticated with Supabase → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If backend errored but Supabase user exists, let them through.
  // The individual page (Profile/Settings) will show the specific error.
  if (requireUsername && !backendError && backendUser && !backendUser.hasSetUsername) {
    return <Navigate to="/set-username" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
