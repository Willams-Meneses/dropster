import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import type { Order } from '@/types/order.type';

interface SidebarRowProps {
  label: string;
  value: React.ReactNode;
}

const SidebarRow: React.FC<SidebarRowProps> = ({ label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 0.75 }}>
    <Typography variant="body1" sx={{ color: 'text.secondary', flexShrink: 0, mr: 2 }}>
      {label}
    </Typography>
    <Box sx={{ textAlign: 'right' }}>{value}</Box>
  </Box>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="h3" sx={{ mb: 2 }}>{children}</Typography>
);

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleString('es-AR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' hs';
};

const formatMoney = (val: number | string): string =>
  `$ ${Number(val).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;

interface OrderDetailSidebarProps {
  order: Order;
}

export const OrderDetailSidebar: React.FC<OrderDetailSidebarProps> = ({ order }) => {
  const totalItems = order.subOrders.reduce(
    (acc, sub) => acc + sub.items.reduce((a, i) => a + i.quantity, 0),
    0,
  );

  const totalShipping = order.subOrders.reduce(
    (acc, sub) => acc + Number(sub.shippingCost),
    0,
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

      {/* Detalles del pedido */}
      <Box>
        <SectionTitle>Detalles del pedido</SectionTitle>
        <SidebarRow
          label="Número de pedido:"
          value={
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              #{order.orderNumber}
            </Typography>
          }
        />
        <SidebarRow
          label="Fecha de pedido:"
          value={
            <Typography variant="body1">{formatDate(order.createdAt)}</Typography>
          }
        />
        <SidebarRow
          label="Tienda:"
          value={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {order.storeLogoUrl && (
                <Box
                  component="img"
                  src={order.storeLogoUrl}
                  sx={{ width: 20, height: 20, borderRadius: '50%' }}
                />
              )}
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {order.storeName}
              </Typography>
            </Box>
          }
        />
      </Box>

      <Divider />

      {/* Entrega */}
      <Box>
        <SectionTitle>Entrega</SectionTitle>
        <Typography variant="h5" sx={{ mb: 1 }}>Dirección de entrega</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>{order.customerName}</Typography>
          {order.customerAddress && (
            <Typography variant="body1">{order.customerAddress}</Typography>
          )}
          {(order.customerCp || order.customerLocalidad || order.customerProvincia) && (
            <Typography variant="body1">
              {[order.customerCp, order.customerLocalidad, order.customerProvincia]
                .filter(Boolean)
                .join(' ')}
            </Typography>
          )}
          {order.customerEmail && (
            <Typography variant="body1">{order.customerEmail}</Typography>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Método de pago — placeholder hasta tener datos reales */}
      <Box>
        <SectionTitle>Método de Pago</SectionTitle>
        <Typography variant="body1">Mercado Pago</Typography>
      </Box>

      <Divider />

      {/* Totales */}
      <Box>
        <SectionTitle>Totales</SectionTitle>
        <SidebarRow
          label={`${totalItems} artículo${totalItems !== 1 ? 's' : ''}`}
          value={<Typography variant="body1">{formatMoney(order.total)}</Typography>}
        />
        <SidebarRow
          label="Envío"
          value={<Typography variant="body1">{formatMoney(totalShipping)}</Typography>}
        />
        <SidebarRow
          label="Descuento total"
          value={<Typography variant="body1">{formatMoney(0)}</Typography>}
        />
        <Divider sx={{ my: 1 }} />
        <SidebarRow
          label="Total"
          value={
            <Typography variant="h5">{formatMoney(order.total)}</Typography>
          }
        />
      </Box>
    </Box>
  );
};