import React from 'react';
import { Box } from '@mui/material';
import { SaleCard } from './SaleCard';
import type { Sale } from '@/types/sale.type';

interface SalesTableProps {
  rows: Sale[];
  onView?: (id: string) => void;
  onPrintLabel?: (id: string) => void;
  onMenuClick?: (id: string) => void;
}

export const SalesTable: React.FC<SalesTableProps> = ({ rows, onView, onPrintLabel, onMenuClick }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
    {rows.map((sale) => (
      <SaleCard 
        key={sale.id} 
        sale={sale} 
        onView={onView} 
        onPrintLabel={onPrintLabel} 
        onMenuClick={onMenuClick} 
      />
    ))}
  </Box>
);