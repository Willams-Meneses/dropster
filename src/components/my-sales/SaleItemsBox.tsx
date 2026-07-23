import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/palette';
import type { Sale } from '@/types/sale.type';

interface SaleItemsBoxProps {
  sale: Sale;
}

const PLACEHOLDER_IMG = 'https://via.placeholder.com/56x56.png?text=Prod';

export const SaleItemsBox: React.FC<SaleItemsBoxProps> = ({ sale }) => {
  return (
    <Box
      sx={{
        border: `1px solid ${colors.neutral[300]}`,
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {sale.items.map((item, idx) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 2,
              py: 1.5,
              borderBottom:
                idx < sale.items.length - 1 ? `1px solid ${colors.neutral[300]}` : 'none',
            }}
          >
            <Box
              component="img"
              src={item.imageUrl || PLACEHOLDER_IMG}
              alt={item.name}
              sx={{ width: 56, height: 56, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }}
            />

            <Box sx={{ flex: '1 1 260px', minWidth: 0 }}>
              <Typography variant="h6" sx={{ color: colors.brand.orange }} noWrap>
                {item.name}
              </Typography>
              {/* Formateamos las variantes (Color, Modelo, Talle, etc.) */}
              {!!item.attributes?.length && (
                <Typography variant="caption" component="div" sx={{ color: colors.content.body }}>
                  {`Cantidad: ${item.quantity}, Variante: ${item.attributes.join(', ')}`}
                </Typography>
              )}
            </Box>

            <Box sx={{ flex: '0 0 auto', px: 2, borderLeft: `1px solid ${colors.neutral[300]}` }}>
              <Typography variant="caption" component="div">
                SKU: {item.sku ?? '-'}
              </Typography>
            </Box>

            <Box sx={{ flex: '0 0 auto', px: 2, borderLeft: `1px solid ${colors.neutral[300]}` }}>
              <Typography variant="body1" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                Productos: ${' '}
                {(Number(item.unitPrice) * item.quantity).toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};