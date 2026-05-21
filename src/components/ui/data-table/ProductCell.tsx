import React from 'react';
import { Box, Typography } from '@mui/material';
import { ChipCustom } from '../ChipCustom';
import { colors } from '@/theme/palette';
import { StatusChip, type StatusChipConfig } from './StatusChip';

interface ProductCellProps {
  name: string;
  imageUrl?: string;
  tags?: string[];
  statusConfig?: StatusChipConfig;
  /** Slot extra debajo del nombre (ej: chip de visibilidad global del producto) */
  extra?: React.ReactNode;
  onNameClick?: () => void;
}

/**
 * Celda estándar de producto usada en todas las tablas:
 * - Chip de status (opcional)
 * - Imagen + nombre clickeable + tags
 * - Slot `extra` para contenido adicional debajo
 */
export const ProductCell: React.FC<ProductCellProps> = ({
  name,
  imageUrl,
  tags = [],
  statusConfig,
  extra,
  onNameClick,
}) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    {statusConfig && <StatusChip config={statusConfig} />}

    <Box sx={{ display: 'flex', gap: 1 }}>
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={name}
          sx={{
            width: 64,
            height: 64,
            objectFit: 'contain',
            borderRadius: 1,
            flexShrink: 0,
          }}
        />
      ) : null}

      <Box>
        <Typography
          variant="h6"
          onClick={onNameClick}
          sx={{
            color: colors.brand.orange,
            cursor: onNameClick ? 'pointer' : 'default',
            '&:hover': onNameClick ? { textDecoration: 'underline' } : undefined,
          }}
        >
          {name}
        </Typography>

        {tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
            {tags.map((tag) => (
              <ChipCustom
                key={tag}
                label={tag}
                border
                borderColor={colors.neutral[300]}
                size="medium"
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>

    {extra}
  </Box>
);