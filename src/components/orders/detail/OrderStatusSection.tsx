import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import type { OrderStatus } from '@/types/order.type';
import { ORDER_STATUS_CONFIG } from '@/config/order-status.config';

const STATUS_MESSAGES: Record<OrderStatus, string> = {
  pending_payment: 'Al abonar tu pedido comenzará el proceso de envío.',
  paid: 'Tu pedido está siendo preparado y enviado por los proveedores.',
  delivered: 'Tu pedido fue entregado exitosamente.',
  cancelled: 'Este pedido fue cancelado.',
  not_delivered: 'No se pudo entregar el pedido. Contactá al soporte.',
};

interface OrderStatusSectionProps {
  status: OrderStatus;
  isTiendanube?: boolean;
}

export const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({ status, isTiendanube }) => {
  const config = ORDER_STATUS_CONFIG[status];
  
  let message = STATUS_MESSAGES[status];
  if (isTiendanube && status === 'paid') {
    message = 'Esta venta fue realizada en tu tienda de Tiendanube y será despachada por vos.';
  }
  return (
    <Box>
      <Typography variant="caption">Estado:</Typography>
      <Typography variant="h2" sx={{ mt: 0.5, mb: 1, textTransform: 'uppercase' }}>
        {isTiendanube && status === 'paid' ? 'Vendido en Tiendanube' : (config?.label ?? status)}
      </Typography>
      <Typography variant="body1">{message}</Typography>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};