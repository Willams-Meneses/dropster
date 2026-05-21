import React from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { colors } from '@/theme/palette';

interface IconComponentProps {
  size?: number;
  color?: string;
}

interface ChipCustomProps {
  label?: string;
  /** Borde: puede ser true (usa 1px solid por defecto) o un string personalizado */
  border?: boolean | string;
  /** Color del borde */
  borderColor?: string;
  /** Color de fondo (default: blanco) */
  backgroundColor?: string;
  /** Color del texto */
  textColor?: string;
  /** Ícono personalizado */
  icon?: React.ComponentType<IconComponentProps>;
  /** Tamaño del ícono */
  iconSize?: number;
  /** Estilos adicionales para el Box */
  sx?: SxProps<Theme>;
  size?: 'large' | 'medium';
}

export const ChipCustom: React.FC<ChipCustomProps> = ({
  label,
  border,
  borderColor,
  backgroundColor = colors.white,
  textColor,
  icon: IconComponent,
  iconSize = 14,
  sx,
  size = 'large',
}) => {

  // Construir estilos del borde
  const getBorderStyles = () => {
    if (!border) return {};

    const borderValue = typeof border === 'string' ? border : '1px solid';
    const borderColorValue = borderColor || 'currentColor';

    return {
      border: borderValue,
      borderColor: borderColorValue,
    };
  };

  const getSizeStyles = () => {
    if (size === 'medium') {
      return {
        px: '8px',
        py: '4px',
      };
    }
    // large (default)
    return {
      px: '6px',
      py: '8px',
    };
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        backgroundColor: backgroundColor,
        borderRadius: '100px',
        width: 'fit-content',
        ...getSizeStyles(),
        ...getBorderStyles(),
        ...sx,
      }}
    >
      {IconComponent && (
        <IconComponent
          size={iconSize}
          color={textColor}
        />
      )}
      <Typography
        variant="subtitle1"
        sx={{
          color: textColor,
          fontWeight: size === 'medium' ? 500 : undefined,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};