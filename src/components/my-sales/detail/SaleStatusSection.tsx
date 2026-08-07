import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import type { SaleStatus } from '@/types/sale.type';
import { SALE_STATUS_CONFIG, SALE_STATUS_MESSAGES } from '@/config/sale-status.config';

interface SaleStatusSectionProps {
  status: SaleStatus;
}

export const SaleStatusSection: React.FC<SaleStatusSectionProps> = ({ status }) => {
  const config = SALE_STATUS_CONFIG[status];

  return (
    <Box>
      <Typography variant="caption">Estado:</Typography>
      <Typography variant="h2" sx={{ mt: 0.5, mb: 1, textTransform: 'uppercase' }}>
        {config?.label ?? status}
      </Typography>
      <Typography variant="body1">{SALE_STATUS_MESSAGES[status]}</Typography>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
};