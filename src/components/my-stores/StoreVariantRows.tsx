import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { StoreListingVariant } from '@/types/store-listing.type';
import { StockInput } from '@/components/ui/data-table/StockInput';
import { PriceInput } from '@/components/ui/data-table/PriceInput';
import { RowActions } from '@/components/ui/data-table/RowActions';

interface StoreVariantRowsProps {
  variants: StoreListingVariant[];
  onRemove?: (tiendanubeProductId: string) => void;
  onSellPriceChange?: (dropshipperVariantId: string, newPrice: number) => void;
}

/**
 * Grid de variantes para "Mis Productos en Tienda".
 *
 * Columnas: Stock | Precio (cost, read-only) | Precio de venta sugerido (read-only)
 *           | Precio de venta (sellPrice, EDITABLE) | Variantes | Acciones
 *
 * sellPrice se confirma al perder el foco (onBlur). Si el usuario no cambió el valor
 * no se hace la llamada a la API.
 *
 * cost y suggestedPrice son del proveedor → siempre disabled.
 * stock también es del proveedor → disabled.
 */
export const StoreVariantRows: React.FC<StoreVariantRowsProps> = ({
  variants,
  onRemove,
  onSellPriceChange,
}) => {
  // Estado local por variante para el input de sellPrice antes de confirmar
  const [localPrices, setLocalPrices] = useState<Record<string, number>>(
    () => Object.fromEntries(variants.map((v) => [v.dropshipperVariantId, v.sellPrice])),
  );

  const handlePriceBlur = (variant: StoreListingVariant) => {
    const current = localPrices[variant.dropshipperVariantId];
    if (current !== variant.sellPrice && current > 0) {
      onSellPriceChange?.(variant.dropshipperVariantId, current);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {variants.map((variant, idx) => (
        <Box
          key={variant.dropshipperVariantId}
          sx={{
            display: 'grid',
            gridTemplateColumns: '80px 120px 120px 120px 1fr auto',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {/* Stock — del proveedor, read-only */}
          <StockInput value={variant.stock} disabled />

          {/* Precio de costo — del proveedor, read-only */}
          <PriceInput value={variant.cost} disabled />

          {/* Precio sugerido — del proveedor, read-only */}
          <PriceInput value={variant.suggestedPrice} disabled />

          {/* Precio de venta — editable por el dropshipper */}
          <PriceInput
            value={localPrices[variant.dropshipperVariantId] ?? variant.sellPrice}
            onChange={(val) =>
              setLocalPrices((prev) => ({ ...prev, [variant.dropshipperVariantId]: val }))
            }
            onBlur={() => handlePriceBlur(variant)}
          />

          {/* Nombre de la variante */}
          <Typography variant="caption" noWrap>
            {variant.name}
          </Typography>

          {/* Eliminar — solo visible en la primera fila */}
          <RowActions
            visible={idx === 0}
            onDelete={() => onRemove?.(variant.tiendanubeProductId)}
          />
        </Box>
      ))}
    </Box>
  );
};