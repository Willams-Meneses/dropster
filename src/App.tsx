import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { useAuthStore } from '@/store/auth.store';
import RegisterRoleSelection from './pages/RoleSelection';
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
      {/* TODO: El protectedRoute es un layout de rutas que protege las rutas hijas y se encarga de redireccionar al dashboard si cumple con los
      requerimientos de este layout, sino cumple redirige al path correspondiente. Por lo tanto cuando api da success por ejemplo register
      ya no se redirecciona al dashboard de eso se encarga protectedRoute */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;