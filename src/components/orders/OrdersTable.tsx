import React from 'react';
import { Box } from '@mui/material';
import { OrderCard } from './OrderCard';
import type { Order } from '@/types/order.type';

interface OrdersTableProps {
  rows: Order[];
  onPay?: (id: string) => void;
  onView?: (id: string) => void;
  onMenuClick?: (id: string) => void;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ rows, onPay, onView, onMenuClick }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
    {rows.map((order) => (
      <OrderCard key={order.id} order={order} onPay={onPay} onView={onView} onMenuClick={onMenuClick} />
    ))}
  </Box>
);