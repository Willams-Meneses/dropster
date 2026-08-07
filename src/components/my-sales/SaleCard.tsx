
import React from 'react';
import { Box, Typography, IconButton, Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { colors } from '@/theme/palette';
import { StatusChip } from '@/components/ui/data-table/StatusChip';
import { SALE_STATUS_CONFIG } from '@/config/sale-status.config';
import { SaleItemsBox } from './SaleItemsBox';
import type { Sale } from '@/types/sale.type';
import { formatDate } from '@/utils/formatDate';

interface SaleCardProps {
  sale: Sale;
  onView?: (id: string) => void;
  onPrintLabel?: (id: string) => void;
  onMenuClick?: (id: string) => void;
}

export const SaleCard: React.FC<SaleCardProps> = ({ sale, onView, onPrintLabel, onMenuClick }) => {

  return (
    <Box
      sx={{
        borderRadius: '12px',
        backgroundColor: colors.white,
        boxShadow: '0px 2px 12px rgba(0,0,0,0.08)',
        p: 2.5,
      }}
    >
      {/* Fila 1: fecha / total / botón de menú circular (...) */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Typography variant="subtitle1">{formatDate(sale.createdAt)} hs</Typography>
        <Box sx={{ width: '1px', height: 16, backgroundColor: colors.neutral[300] }} />
        <Typography variant="h6">
          Total: $ {Number(sale.total).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <IconButton 
          size="small" 
          onClick={() => onMenuClick?.(sale.id)}
          sx={{ 
            border: `1px solid ${colors.neutral[300]}`,
            borderRadius: '50%'
          }}
        >
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
          borderBottom: `1px solid ${colors.neutral[300]}`,
        }}
      >
        <Typography variant="subtitle1">Número de pedido: #{sale.orderNumber}</Typography>
        <StatusChip config={SALE_STATUS_CONFIG[sale.status]} />
        <Box sx={{ flex: 1 }} />
        <Button variant="outlined" size="small" onClick={() => onView?.(sale.id)} sx={{ textTransform: 'none' }}>
          Ver detalle
        </Button>
        {sale.status === 'ready_to_dispatch' && (
          <Button variant="contained" size="small" onClick={() => onPrintLabel?.(sale.id)} sx={{ textTransform: 'none' }}>
            Imprimir etiqueta
          </Button>
        )}
      </Box>

      {/* Items de la venta (sin costo de envío ni header extra) */}
      <SaleItemsBox sale={sale} />
    </Box>
  );
};