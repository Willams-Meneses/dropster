import React from 'react';
import { Box, Typography } from '@mui/material';
import type { ListingVariant } from '@/types/listings.type';
import { RowActions } from './RowActions';
import { StockInput } from './StockInput';
import { PriceInput } from './PriceInput';
import { VisibilityChip } from './VisibilityChip';

interface VariantRowsProps {
  variants: ListingVariant[];
  /** Muestra los botones de acción solo en la primera fila */
  hasIndividualActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

/**
 * Grid de variantes con stock, precio de venta (droppers), precio sugerido,
 * nombre de variante y chip de visibilidad.
 * Los inputs se deshabilitan cuando la variante no es visible.
 */
export const VariantRows: React.FC<VariantRowsProps> = ({
  variants,
  hasIndividualActions = false,
  onEdit,
  onDelete,
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    {variants.map((variant, idx) => (
      <Box
        key={variant.id}
        sx={{
          display: 'grid',
          gridTemplateColumns: '80px 120px 120px 1fr auto',
          alignItems: 'center',
          gap: 1,
          opacity: variant.visible ? 1 : 0.45,
        }}
      >
        <StockInput value={variant.stock} disabled={!variant.visible} />
        <PriceInput value={variant.droppersPrice} disabled={!variant.visible} />
        <PriceInput value={variant.suggestedPrice} disabled={!variant.visible} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="caption" noWrap>
            {variant.name}
          </Typography>
          <VisibilityChip visible={variant.visible} />
        </Box>

        <RowActions
          visible={idx === 0 && hasIndividualActions}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Box>
    ))}
  </Box>
);