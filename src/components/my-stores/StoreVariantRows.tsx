import React, { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import type { StoreListingVariant } from '@/types/store-listing.type';
import { StockInput } from '@/components/ui/data-table/StockInput';
import { PriceInput } from '@/components/ui/data-table/PriceInput';
import { RowActions } from '@/components/ui/data-table/RowActions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CachedIcon from '@mui/icons-material/Cached';
import { colors } from '@/theme/palette';

interface StoreVariantRowsProps {
  variants: StoreListingVariant[];
  productId: string;
  onRemove?: (tiendanubeProductId: string) => void;
  onSellPriceChange?: (dropshipperVariantId: string, newPrice: number) => void;
  onPublish?: (productId: string) => void;
  onBuyStock?: (productId: string) => void;
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
  productId,
  onRemove,
  onSellPriceChange,
  onPublish,
  onBuyStock,
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

  const isProductPublished = variants.some(
    (v) => Boolean(v.tiendanubeVariantId) && v.tiendanubeVariantId !== 'null' && v.tiendanubeVariantId !== ''
  );

  // Se puede publicar si no está publicado y al menos una variante tiene publish=true y stock > 0
  const canPublishProduct = !isProductPublished && variants.some((v) => v.publish === true && v.stock > 0);

  // Se puede actualizar si ya está publicado y tiene stock > 0
  const canUpdateStock = isProductPublished && variants.some((v) => v.stock > 0);


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {variants.map((variant, idx) => {
        return (
          <Box
            key={variant.dropshipperVariantId}
            sx={{
              display: 'grid',
              gridTemplateColumns: '80px 120px 120px 1fr auto',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <StockInput value={variant.stock} disabled />
            <PriceInput value={variant.cost} disabled />
            <PriceInput
              value={localPrices[variant.dropshipperVariantId] ?? variant.sellPrice}
              onChange={(val) =>
                setLocalPrices((prev) => ({ ...prev, [variant.dropshipperVariantId]: val }))
              }
              onBlur={() => handlePriceBlur(variant)}
            />

            <Typography variant="caption" noWrap sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {variant.name}
              {isProductPublished && idx === 0 && (
                <Box component="span" sx={{ px: 0.5, borderRadius: 0.5, bgcolor: 'success.main', color: 'white', fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Publicado
                </Box>
              )}
            </Typography>

            <RowActions
              visible={idx === 0}
              onDelete={() => onRemove?.(productId)}
              extraActions={
                <>
                  <Tooltip title="Comprar Stock para Tiendanube">
                    <IconButton size="small" onClick={() => onBuyStock?.(productId)}>
                      <ShoppingCartCheckoutIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  { /* Cambio de ícono y tooltip según el estado de publicación */}
                  <Tooltip title={isProductPublished ? "Actualizar Stock en Tiendanube" : (canPublishProduct ? "Publicar en Tiendanube" : "Comprá y recibí el stock para publicar")}>
                    <span>
                      <IconButton
                        size="small"
                        onClick={() => onPublish?.(productId)}
                        disabled={!canPublishProduct && !canUpdateStock}
                        sx={{ color: isProductPublished ? colors.blue.main : (canPublishProduct ? colors.brand.orangeDark : colors.text.disabled) }} // Azul para actualizar, Naranja para publicar
                      >
                        {isProductPublished ? <CachedIcon fontSize="small" /> : <CloudUploadIcon fontSize="small" />}
                      </IconButton>
                    </span>
                  </Tooltip>
                </>
              }
            />
          </Box>
        );
      })}
    </Box>
  );
};