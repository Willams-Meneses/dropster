import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import type { Sale } from '@/types/sale.type';
import { DetailItemRow } from '@/components/ui/detail/DetailItemRow';
import { formatPrice } from '@/utils/format.utils';

interface SaleDetailItemsProps {
  sale: Sale;
}

export const SaleDetailItems: React.FC<SaleDetailItemsProps> = ({ sale }) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h2" sx={{ mb: 2 }}>Productos</Typography>
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: '0px 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3, pt: 2 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Costo de envío: {formatPrice(sale.shippingCost)}
        </Typography>
      </Box>
      <Divider sx={{ mt: 1.5 }} />
      {sale.items.map((item, idx) => (
        <DetailItemRow key={item.id} item={item} isLast={idx === sale.items.length - 1} />
      ))}
    </Box>
  </Box>
);