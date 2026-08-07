import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import type { Sale } from '@/types/sale.type';
import { formatPrice } from '@/utils/formatPrice';
import { formatDate } from '@/utils/formatDate';

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

interface SaleDetailSidebarProps {
  sale: Sale;
}

export const SaleDetailSidebar: React.FC<SaleDetailSidebarProps> = ({ sale }) => {
  const totalItems = sale.items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <SectionTitle>Detalles del pedido</SectionTitle>
        <SidebarRow
          label="Número de pedido:"
          value={<Typography variant="body1" sx={{ fontWeight: 600 }}>#{sale.orderNumber}</Typography>}
        />
        <SidebarRow
          label="Fecha de pedido:"
          value={<Typography variant="body1">{formatDate(sale.createdAt)}</Typography>}
        />
      </Box>

      <Divider />

      <Box>
        <SectionTitle>Entrega</SectionTitle>
        <Typography variant="h5" sx={{ mb: 1 }}>Dirección de entrega</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>{sale.customerName}</Typography>
          {sale.customerAddress && <Typography variant="body1">{sale.customerAddress}</Typography>}
          {(sale.customerCp || sale.customerLocalidad || sale.customerProvincia) && (
            <Typography variant="body1">
              {[sale.customerCp, sale.customerLocalidad, sale.customerProvincia].filter(Boolean).join(' ')}
            </Typography>
          )}
          {sale.customerEmail && <Typography variant="body1">{sale.customerEmail}</Typography>}
        </Box>
      </Box>

      <Divider />

      <Box>
        <SectionTitle>Método de Pago</SectionTitle>
        <Typography variant="body1">Mercado Pago</Typography>
      </Box>

      <Divider />

      <Box>
        <SectionTitle>Totales</SectionTitle>
        <SidebarRow
          label={`${totalItems} artículo${totalItems !== 1 ? 's' : ''}`}
          value={<Typography variant="body1">{formatPrice(sale.total)}</Typography>}
        />
        <SidebarRow label="Envío" value={<Typography variant="body1">{formatPrice(sale.shippingCost)}</Typography>} />
        <Divider sx={{ my: 1 }} />
        <SidebarRow label="Total" value={<Typography variant="h5">{formatPrice(sale.total)}</Typography>} />
      </Box>
    </Box>
  );
};