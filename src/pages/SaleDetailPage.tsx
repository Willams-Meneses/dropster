import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useSaleDetail } from '@/hooks/useSaleDetail';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { saleService } from '@/services/sale.service';
import { PageHeader } from '@/components/ui/PageHeader';
import { SaleStatusSection } from '@/components/my-sales/detail/SaleStatusSection';
import { SaleDetailItems } from '@/components/my-sales/detail/SaleDetailItems';
import { SaleDetailSidebar } from '@/components/my-sales/detail/SaleDetailSidebar';

const SaleDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { sale, isLoading, error, refetch } = useSaleDetail(id);
  const [isDispatching, setIsDispatching] = useState(false);

  const handleDispatch = async () => {
    setIsDispatching(true);
    try {
      await saleService.dispatchSale(id);
      refetch();
    } catch {
      // TODO: mostrar error al usuario
    } finally {
      setIsDispatching(false);
    }
  };

  if (isLoading) return <LoadingScreen message="Cargando venta..." />;
  if (error || !sale) return <ErrorMessage message={error ?? 'Venta no encontrada.'} onRetry={refetch} />;

  const canDispatch = sale.status === 'ready_to_dispatch';

  return (
    <Box sx={{ px: 0, mt: 3 }}>
      <PageHeader
        title={`Pedido #${sale.orderNumber}`}
        actions={
          canDispatch ? (
            <Button variant="contained" onClick={handleDispatch} disabled={isDispatching}>
              {isDispatching ? 'Despachando...' : 'Imprimir etiqueta'}
            </Button>
          ) : undefined
        }
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 360px' },
          gap: { xs: 4, md: 6 },
          alignItems: 'start',
        }}
      >
        <Box>
          <SaleStatusSection status={sale.status} />
          <SaleDetailItems sale={sale} />
        </Box>

        <Box sx={{ position: { md: 'sticky' }, top: { md: 24 } }}>
          <SaleDetailSidebar sale={sale} />
        </Box>
      </Box>
    </Box>
  );
};

export default SaleDetailPage;