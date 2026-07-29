import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useOrderDetail } from '@/hooks/useOrderDetail';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { OrderStatusSection } from '@/components/orders/detail/OrderStatusSection';
import { OrderDetailProducts } from '@/components/orders/detail/OrderDetailProducts';
import { OrderDetailSidebar } from '@/components/orders/detail/OrderDetailSidebar';
import { orderService } from '@/services/order.service';

const OrderDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, isLoading, error, refetch } = useOrderDetail(id);

  const handlePay = async () => {
    try {
      const { checkoutUrl } = await orderService.initiatePayment(id);
      window.location.href = checkoutUrl;
    } catch {
      // TODO: mostrar error al usuario
    }
  };

  if (isLoading) return <LoadingScreen message="Cargando pedido..." />;
  if (error || !order) return <ErrorMessage message={error ?? 'Pedido no encontrado.'} onRetry={refetch} />;

  const isPendingPayment = order.status === 'pending_payment';

  return (
    <Box sx={{ px: 0, mt: 3 }}>
      {/* ── Page header ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Tooltip title="Volver">
            <IconButton size="small" onClick={() => navigate(-1)}>
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box
            component="h1"
            sx={{
              m: 0,
              fontSize: '24px',
              fontWeight: 700,
              color: 'text.primary',
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Pedido #{order.orderNumber}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isPendingPayment && (
            <Button variant="contained" onClick={() => void handlePay()}>
              Pagar
            </Button>
          )}
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        </Box>
      </Box>

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