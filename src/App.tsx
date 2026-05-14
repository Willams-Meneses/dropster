import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { useAuthStore } from '@/store/auth.store';
import RegisterRoleSelection from './pages/RegisterRoleSelection';
import ProtectedRoute from './components/ui/ProtectedRoute';

// Placeholder para rutas protegidas — reemplazá con tus páginas reales
const Dashboard = () => <div>Dashboard</div>;

// Rutas públicas que no necesitan token
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password'];
void PUBLIC_ROUTES;

function App() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return (
    <Routes>
      {/* Rutas públicas — auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/select-role" element={<RegisterRoleSelection />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;