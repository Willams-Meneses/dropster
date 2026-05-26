import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { useStore } from '@/hooks/useStore';
import TiendanubeStoreCard from '@/components/my-stores/TiendanubeStoreCard';
import AddStoreDrawer from '@/components/my-stores/AddStoreDrawer';

const TN_APP_ID = import.meta.env.VITE_TIENDANUBE_CLIENT_ID as string;

function buildTiendanubeAuthUrl(): string {
  return `https://www.tiendanube.com/apps/${TN_APP_ID}/authorize`;
}

const MyStoresPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { store, isLoading, error, refetch } = useStore();

  const handleSelectOption = (id: 'tiendanube' | 'shopify' | 'csv') => {
    if (id === 'tiendanube') {
      // Redirige al flujo OAuth de Tiendanube
      window.location.href = buildTiendanubeAuthUrl();
    }
    // shopify / csv: implementar cuando corresponda
  };

  if (isLoading) {
    return <LoadingScreen message="Cargando tienda..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Mis tiendas"
        description="Desde aquí podrás administrar todas las operaciones que realices, de manera rápida y eficaz."
        actions={
          // Solo mostramos el botón si no hay tienda conectada todavía
          !store ? (
            <Button variant="contained" color="primary" onClick={() => setDrawerOpen(true)}>
              Nueva tienda
            </Button>
          ) : null
        }
      />

      <Box sx={{ mt: 3 }}>
        {store ? (
          <TiendanubeStoreCard store={store} />
        ) : (
          // Empty state — sin tienda conectada
          <Box sx={{ color: 'text.secondary' }}>
            No tenés ninguna tienda conectada todavía.
          </Box>
        )}
      </Box>

      <AddStoreDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelectOption={handleSelectOption}
      />
    </>
  );
};

export default MyStoresPage;