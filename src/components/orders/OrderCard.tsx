import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { colors } from '@/theme/palette';
import { StatusChip } from '@/components/ui/data-table/StatusChip';
import { ORDER_STATUS_CONFIG } from '@/config/order-status.config';
import { ProviderShipmentBox } from './ProviderShipmentBox';
import type { Order } from '@/types/order.type';

interface OrderCardProps {
  order: Order;
  onPay?: (id: string) => void;
  onView?: (id: string) => void;
  onMenuClick?: (id: string) => void;
  isPaying?: boolean;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPay, onView, onMenuClick, isPaying }) => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Box
      sx={{
        borderRadius: '12px',
        backgroundColor: colors.white,
        boxShadow: '0px 2px 12px rgba(0,0,0,0.08)',
        p: 2.5,
      }}
    >
      {/* Fila 1: fecha / cliente / total / menú */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Typography variant="subtitle1">{formattedDate} hs</Typography>
        {/* <Divider /> */}
        <Box sx={{ width: '1px', height: 16, backgroundColor: colors.neutral[300] }} />
        <Typography variant="h6">{order.storeName}</Typography>
        <Box sx={{ flex: 1 }} />
        <Typography variant="h6">
          Total: $ {Number(order.total).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </Typography>
        <IconButton size="small" onClick={() => onMenuClick?.(order.id)}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Fila 2: número de pedido / estado / acciones */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pb: 2,
          mb: 2,
        }}
      >
        <Typography variant="subtitle1">Número de pedido: #{order.orderNumber}</Typography>
        <StatusChip config={ORDER_STATUS_CONFIG[order.status]} />
        <Box sx={{ flex: 1 }} />
        <Button variant="outlined" size="small" onClick={() => onView?.(order.id)} sx={{
          py: 0.5,
          px: 1.5
        }}>
          Ver pedido
        </Button>
        {order.status === 'pending_payment' && (
          <Button variant="contained" size="small" onClick={() => onPay?.(order.id)} loading={isPaying}
            disabled={isPaying}  sx={{
            py: 0.5,
            px: 1.5,
            width: '95px'
          }}>
            Pagar
          </Button>
        )}
      </Box>

      {/* Sub-órdenes por proveedor */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {order.subOrders.map((subOrder) => (
          <ProviderShipmentBox key={subOrder.id} subOrder={subOrder} />
        ))}
      </Box>
    </Box>
  );
};