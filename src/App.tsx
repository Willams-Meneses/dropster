import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import { useAuthStore } from '@/store/auth.store';
import ProtectedRoute from './components/ui/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import RoleSelectionPage from './pages/RoleSelectionPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import MyListingsPage from './pages/MyListingsPage';
import MyStoresPage from './pages/MyStoresPage';
import TiendanubeCallbackPage from './pages/TiendanubeCallbackPage';
import { SnackbarProvider } from 'notistack';
import MyStoresDetailPage from './pages/MyStoresDetailPage';
import ProductFormPage from './pages/ProductFormPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import OrdersPage from './pages/OrdersPage';
import MySalesPage from './pages/MySalesPage';
import OrderDetailPage from './pages/OrderDetailPage';
import { PaymentStatusPage } from './pages/PaymentStatusPage';
import SaleDetailPage from './pages/SaleDetailPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import MyProfilePage from './pages/MyProfilePage';

// Rutas públicas que no necesitan token
const PUBLIC_ROUTES = ['/login', '/register', '/forgot-password'];
void PUBLIC_ROUTES;

function App() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return (

    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={3000}
    >
      <Routes>
        {/* Rutas públicas — auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/select-role" element={<RoleSelectionPage />} />


        {/*
        Callback de TN va FUERA del ProtectedRoute.
        Cuando TN redirige acá el JWT puede no estar rehidratado todavía,
        y el callback igual necesita estar autenticado en la API (el token
        viaja en el header via axios interceptor una vez que hydrate termina).
        Si tu ProtectedRoute bloquea antes de que hydrate resuelva, moverlo
        acá evita el redirect al login.
      */}
        <Route path="/dashboard/my-stores/callback" element={<TiendanubeCallbackPage />} />

        {/* 👇 Ruta de retorno de Mercado Pago, fuera del DashboardLayout pero protegida */}
        <Route path="/payment/status" element={<PaymentStatusPage />} />

        {/* Rutas protegidas */}
        {/* TODO: El protectedRoute es un layout de rutas que protege las rutas hijas y se encarga de redireccionar al dashboard si cumple con los
      requerimientos de este layout, sino cumple redirige al path correspondiente. Por lo tanto cuando api da success por ejemplo register
      ya no se redirecciona al dashboard de eso se encarga protectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<ProductsPage />} />
            <Route path="my-listings" element={<MyListingsPage />} />
            <Route path='my-listings/new' element={<ProductFormPage />} />
            <Route path='my-listings/edit/:id' element={<ProductFormPage />} />
            <Route path="my-stores" element={<MyStoresPage />} />
            <Route path="my-stores/detail" element={<MyStoresDetailPage />} />
            <Route path='products/:id' element={<ProductDetailPage />} />
            <Route path='orders' element={<OrdersPage />} />
            <Route path='orders/:id' element={<OrderDetailPage />} />
            <Route path='my-sales' element={<MySalesPage />} />
            <Route path='my-sales/:id' element={<SaleDetailPage />} />
            <Route path='my-profile' element={<MyProfilePage />} />
            <Route path='my-profile/personal-data' element={<PersonalInfoPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;