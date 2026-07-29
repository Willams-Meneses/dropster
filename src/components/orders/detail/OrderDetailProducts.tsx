import React from 'react';
import { Box, Typography } from '@mui/material';
import type { SubOrder } from '@/types/order.type';
import { OrderDetailProviderGroup } from './OrderDetailProviderGroup';

interface OrderDetailProductsProps {
  subOrders: SubOrder[];
}

export const OrderDetailProducts: React.FC<OrderDetailProductsProps> = ({ subOrders }) => (
  <Box sx={{ mt: 3 }}>
    <Typography variant="h2" sx={{ mb: 2 }}>Productos</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {subOrders.map((sub) => (
        <OrderDetailProviderGroup key={sub.id} subOrder={sub} />
      ))}
    </Box>
  </Box>
);