import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/palette';
import type { Listing, ListingStatus } from '@/types/listings.type';
import type { StatusChipConfig } from '../ui/data-table/StatusChip';
import { DataTable, type ColumnDef } from '../ui/data-table/DataTable';
import { ProductCell } from '../ui/data-table/ProductCell';
import { VariantRows } from '../ui/data-table/VariantRows';

// ── Status chip config ───────────────────────────────────────────────────────

const LISTING_STATUS_CHIP: Record<ListingStatus, StatusChipConfig> = {
  active: {
    label: 'Activa',
    backgroundColor: colors.green.main,
    textColor: colors.white,
  },
  pending: {
    label: 'Pendiente',
    backgroundColor: colors.status.warning,
    textColor: colors.white,
  },
  in_review: {
    label: 'En revisión',
    backgroundColor: colors.status.warning,
    textColor: colors.white,
  },
  hidden: {
    label: 'Oculta',
    backgroundColor: colors.neutral[400],
    textColor: colors.white,
  },
  rejected: {
    label: 'Rechazada',
    backgroundColor: colors.status.error,
    textColor: colors.white,
  },
};

// ── Column definitions ───────────────────────────────────────────────────────

function buildColumns(
  onCopy?: (id: string) => void,
  onDelete?: (id: string) => void,
): ColumnDef<Listing>[] {
  return [
    {
      key: 'product',
      header: 'Producto',
      width: '260px',
      render: (row) => (
        <ProductCell
          name={row.name}
          imageUrl={row.imageUrl}
          tags={row.tags}
          statusConfig={LISTING_STATUS_CHIP[row.status]}
        />
      ),
    },
    {
      key: 'variants',
      header: (
        <Box sx={{ display: 'grid', gridTemplateColumns: '80px 120px 120px 1fr auto', gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Stock</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Precio de venta</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Precio sugerido</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Variantes</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Acciones</Typography>
        </Box>
      ),
      render: (row) => (
        <VariantRows
          variants={row.variants}
          hasIndividualActions
          onCopy={() => onCopy?.(row.id)}
          onDelete={() => onDelete?.(row.id)}
        />
      ),
    },
  ];
}

// ── ListingsTable ────────────────────────────────────────────────────────────

interface ListingsTableProps {
  rows: Listing[];
  selectedIds: Set<string>;
  onSelectRow: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onCopy?: (id: string) => void;
  onDelete?: (id: string) => void;
  bulkActions?: React.ReactNode;
}

export const ListingsTable: React.FC<ListingsTableProps> = ({
  rows,
  selectedIds,
  onSelectRow,
  onSelectAll,
  onCopy,
  onDelete,
  bulkActions,
}) => {
  const columns = buildColumns(onCopy, onDelete);

  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowKey={(row) => row.id}
      selectedIds={selectedIds}
      onSelectRow={onSelectRow}
      onSelectAll={(checked) => onSelectAll(checked)}
      bulkActions={bulkActions}
      onHeaderMenuClick={() => undefined}
    />
  );
};