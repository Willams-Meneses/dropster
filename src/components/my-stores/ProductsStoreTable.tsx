import React from 'react';
import { Box, Typography } from '@mui/material';
import type { StoreListing } from '@/types/store-listing.type';
import { DataTable, type ColumnDef } from '@/components/ui/data-table/DataTable';
import { ProductCell } from '@/components/ui/data-table/ProductCell';
import { StoreVariantRows } from './StoreVariantRows';

// ── Column definitions ────────────────────────────────────────────────────────

function buildColumns(
  onRemove?: (tiendanubeProductId: string) => void,
  onSellPriceChange?: (dropshipperVariantId: string, newPrice: number) => void,
): ColumnDef<StoreListing>[] {
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
        />
      ),
    },
    {
      key: 'variants',
      header: (
        // gridTemplateColumns debe ser idéntico al de StoreVariantRows
        <Box sx={{ display: 'grid', gridTemplateColumns: '80px 120px 120px 1fr auto', gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Stock</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Costo</Typography>
          {/* <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Precio sugerido</Typography> */}
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Precio de venta</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Variantes</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Acciones</Typography>
        </Box>
      ),
      render: (row) => (
        <StoreVariantRows
          variants={row.variants}
          onRemove={onRemove}
          onSellPriceChange={onSellPriceChange}
        />
      ),
    },
  ];
}

// ── ProductStoreTable ────────────────────────────────────────────────────────

interface ProductsStoreTableProps {
  rows: StoreListing[];
  onRemove?: (tiendanubeProductId: string) => void;
  onSellPriceChange?: (dropshipperVariantId: string, newPrice: number) => void;
}

export const ProductsStoreTable: React.FC<ProductsStoreTableProps> = ({
  rows,
  onRemove,
  onSellPriceChange,
}) => {
  const columns = buildColumns(onRemove, onSellPriceChange);

  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowKey={(row) => row.productId}
      onHeaderMenuClick={() => undefined}
    />
  );
};