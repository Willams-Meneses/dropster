import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { colors } from '@/theme/palette';

interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  /** Cuando es false, los botones se renderizan pero son invisibles (mantiene el espacio en grid) */
  visible?: boolean;
}

/**
 * Par de acciones (duplicar / eliminar) para usar en filas de tabla.
 * Acepta `visible` para ocultar sin desmontar (útil en grids donde
 * solo la primera fila de un grupo muestra las acciones).
 */
export const RowActions: React.FC<RowActionsProps> = ({ onEdit, onDelete, visible = true }) => (
  <Box sx={{ display: 'flex', gap: 0.5, visibility: visible ? 'visible' : 'hidden' }}>
    {onEdit && (
      <Tooltip title="Editar">
        <IconButton size="small" onClick={onEdit}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
    <Tooltip title="Eliminar">
      <IconButton size="small" onClick={onDelete} sx={{ color: colors.status.error }}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
);