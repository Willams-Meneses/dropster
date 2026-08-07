import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button
} from '@mui/material';
import { useOrderDetail } from '@/hooks/useOrderDetail';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { OrderStatusSection } from '@/components/orders/detail/OrderStatusSection';
import { OrderDetailProducts } from '@/components/orders/detail/OrderDetailProducts';
import { OrderDetailSidebar } from '@/components/orders/detail/OrderDetailSidebar';
import { orderService } from '@/services/order.service';
import { PageHeader } from '@/components/ui/PageHeader';
import { ActionsMenu, type ActionsMenuItem } from '@/components/ui/buttons/ActionsMenu';

const OrderDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const { order, isLoading, error, refetch } = useOrderDetail(id);

  const handlePay = async () => {
    try {
      const { checkoutUrl } = await orderService.initiatePayment(id);
      window.location.href = checkoutUrl;
    } catch {
      // TODO: mostrar error al usuario
    }
  };

  const handleCancel = () => {
    // TODO: Lógica para cancelar el pedido (ej: orderService.cancelOrder(id))
    console.log('Cancelar pedido:', id);
  };

  if (isLoading) return <LoadingScreen message="Cargando pedido..." />;
  if (error || !order) return <ErrorMessage message={error ?? 'Pedido no encontrado.'} onRetry={refetch} />;

  const isPendingPayment = order.status === 'pending_payment';

  const menuActions: ActionsMenuItem[] = [
    {
      label: 'Cancelar pedido',
      onClick: handleCancel,
      danger: true,
    },
  ];

  return (
    <Box sx={{ px: 0, mt: 3 }}>
      <PageHeader title={`Pedido #${order.orderNumber}`} actions={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {isPendingPayment && (
            <Button variant="contained" onClick={handlePay}>
              Pagar
            </Button>
          )}
          {/* El menú va siempre, fuera del condicional */}
          <ActionsMenu actions={menuActions} ariaLabel="Acciones del pedido" />
        </Box>
      } />
      {/* ── Two-column layout ── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 360px' },
          gap: { xs: 4, md: 6 },
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <Box>
          <OrderStatusSection status={order.status} />
          <OrderDetailProducts subOrders={order.subOrders} />
        </Box>

        {/* Right column */}
        <Box
          sx={{
            position: { md: 'sticky' },
            top: { md: 24 },
          }}
        >
          <OrderDetailSidebar order={order} />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailPage;