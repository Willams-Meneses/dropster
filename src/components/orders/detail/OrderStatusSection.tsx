import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import type { OrderStatus } from '@/types/order.type';
import { ORDER_STATUS_CONFIG } from '@/config/order-status.config';

const STATUS_MESSAGES: Record<OrderStatus, string> = {
  pending_payment: 'Al abonar tu pedido comenzará el proceso de envío.',
  in_process: 'Tu pedido está siendo preparado y enviado por los proveedores.',
  delivered: 'Tu pedido fue entregado exitosamente.',
  cancelled: 'Este pedido fue cancelado.',
  not_delivered: 'No se pudo entregar el pedido. Contactá al soporte.',
};

interface OrderStatusSectionProps {
  status: OrderStatus;
}

export const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({ status }) => {
  const config = ORDER_STATUS_CONFIG[status];

  return (
    <Box>
      <Typography variant="caption">Estado:</Typography>
      <Typography variant="h2" sx={{ mt: 0.5, mb: 1, textTransform: 'uppercase' }}>
        {config?.label ?? status}
      </Typography>
      <Typography variant="body1">{STATUS_MESSAGES[status]}</Typography>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};