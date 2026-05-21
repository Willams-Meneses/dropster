import React from 'react';
import {
  Box,
  Checkbox,
  Typography,
  IconButton,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { colors } from '@/theme/palette';

export interface ColumnDef<TRow> {
  key: string;
  header: React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  render: (row: TRow, index: number) => React.ReactNode;
}

interface DataTableProps<TRow> {
  columns: ColumnDef<TRow>[];
  rows: TRow[];
  getRowKey: (row: TRow) => string;

  /** Si se pasa, se habilita la selección múltiple */
  selectedIds?: Set<string>;
  onSelectRow?: (id: string, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;

  /** Slot para acciones bulk en el header (e.g. "Pagar selección") */
  bulkActions?: React.ReactNode;

  /** Acción de los tres puntos al final del header */
  onHeaderMenuClick?: () => void;

  emptyState?: React.ReactNode;
}

export function DataTable<TRow>({
  columns,
  rows,
  getRowKey,
  selectedIds,
  onSelectRow,
  onSelectAll,
  bulkActions,
  onHeaderMenuClick,
  emptyState,
}: DataTableProps<TRow>): React.ReactElement {
  const hasSelection = selectedIds !== undefined;
  const allSelected = hasSelection && rows.length > 0 && rows.every((r) => selectedIds.has(getRowKey(r)));
  const someSelected = hasSelection && rows.some((r) => selectedIds.has(getRowKey(r)));

  return (
    <Box>
      {/* Table header row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1.5,
          borderRadius: '12px',
          backgroundColor: colors.white,
          boxShadow: '0px 2px 12px rgba(0,0,0,0.08)',
          mb: 1,
        }}
      >
        {hasSelection && (
          <Box sx={{ width: 32, flexShrink: 0 }}>
            <Checkbox
              checked={allSelected}
              indeterminate={!allSelected && someSelected}
              onChange={(_, checked) => onSelectAll?.(checked)}
            />
          </Box>
        )}

        {columns.map((col) => (
          <Box
            key={col.key}
            sx={{
              flex: col.width ? `0 0 ${col.width}` : 1,
              width: col.width,
              textAlign: col.align ?? 'left',
            }}
          >
            <Typography variant="subtitle1" sx={{
              fontWeight: 500
            }}>{col.header}</Typography>
          </Box>
        ))}

        {onHeaderMenuClick && (
          <Box sx={{ width: 32, flexShrink: 0, textAlign: 'right' }}>
            <IconButton size="small" onClick={onHeaderMenuClick}>
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Bulk actions bar */}
      {hasSelection && bulkActions && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1.5,
            px: 2,
            py: 1,
            mb: 1,
          }}
        >
          {hasSelection && (
            <Box sx={{ mr: 'auto' }}>
              <Checkbox
                checked={allSelected}
                indeterminate={!allSelected && someSelected}
                onChange={(_, checked) => onSelectAll?.(checked)}
              />
            </Box>
          )}
          {bulkActions}
        </Box>
      )}

      {/* Rows */}
      {rows.length === 0 ? (
        <Box sx={{ py: 6, textAlign: 'center' }}>
          {emptyState ?? (
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              No hay resultados
            </Typography>
          )}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {rows.map((row, index) => {
            const id = getRowKey(row);
            const isSelected = selectedIds?.has(id) ?? false;

            return (
              <Box
                key={id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  px: 2,
                  py: 2,
                  borderRadius: '12px',
                  backgroundColor: colors.white,
                  boxShadow: '0px 2px 12px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.15s',
                  '&:hover': {
                    boxShadow: '0px 4px 16px rgba(0,0,0,0.12)',
                  },
                }}
              >
                {hasSelection && (
                  <Box sx={{ width: 32, flexShrink: 0, pt: 0.5 }}>
                    <Checkbox
                      checked={isSelected}
                      onChange={(_, checked) => onSelectRow?.(id, checked)}
                    />
                  </Box>
                )}

                {columns.map((col) => (
                  <Box
                    key={col.key}
                    sx={{
                      flex: col.width ? `0 0 ${col.width}` : 1,
                      width: col.width,
                      textAlign: col.align ?? 'left',
                    }}
                  >
                    {col.render(row, index)}
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}