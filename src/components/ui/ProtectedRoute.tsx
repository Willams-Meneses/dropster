import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { LoadingScreen } from './LoadingScreen';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen message="Verificando autenticación..." />;
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!user?.role) return <Navigate to="/select-role" replace />;

  return <Outlet />;
};

export default ProtectedRoute;