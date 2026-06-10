import { useState } from 'react';
import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import type { VariantFormValue } from '@/types/variant.type';
import type { Property } from '@/types/variant.type';
import { DataTable, type ColumnDef } from '@/components/ui/data-table/DataTable';
import { StockInput } from '@/components/ui/data-table/StockInput';
import { PriceInput } from '@/components/ui/data-table/PriceInput';
import { VisibilityChip } from '@/components/ui/data-table/VisibilityChip';
import { colors } from '@/theme/palette';
import { useProductFormStore } from '@/store/productForm.store';
import VariantEditDrawer from './VariantEditDrawer';
import VariantPhotosDrawer from './VariantPhotosDrawer';

// ─── Props ─────────────────────────────────────────────────────────────────────

interface VariantsTableProps {
  properties: Property[];
  variants: VariantFormValue[];
}

// ─── Property chips (header row) ──────────────────────────────────────────────

interface PropertyChipsRowProps {
  properties: Property[];
  onRemoveProperty: (index: number) => void;
}

const PropertyChipsRow: React.FC<PropertyChipsRowProps> = ({ properties, onRemoveProperty }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
    {properties.map((prop, idx) => (
      <Box key={prop.type + idx}>
        <Typography variant="subtitle1" sx={{ mb: 0.75 }}>{prop.name}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {prop.type === 'color'
            ? prop.values.map((cv) => (
                <Chip
                  key={cv.name}
                  label={cv.name}
                  size="small"
                  onDelete={() => onRemoveProperty(idx)}
                  sx={{
                    bgcolor: cv.hex,
                    color: cv.hex === '#FFFFFF' || cv.hex === '#F9A825' ? colors.text.primary : '#fff',
                    '& .MuiChip-deleteIcon': {
                      color: cv.hex === '#FFFFFF' || cv.hex === '#F9A825' ? colors.text.primary : '#fff',
                    },
                  }}
                />
              ))
            : prop.values.map((v) => (
                <Chip
                  key={v}
                  label={v}
                  size="small"
                  variant="outlined"
                  onDelete={() => onRemoveProperty(idx)}
                  sx={{ borderColor: colors.neutral[300] }}
                />
              ))}
        </Box>
      </Box>
    ))}
  </Box>
);

// ─── VariantCell — image + name side by side ───────────────────────────────────

interface VariantCellProps {
  variant: VariantFormValue;
  index: number;
  onEditPhoto: (index: number) => void;
}

const VariantCell: React.FC<VariantCellProps> = ({ variant, index, onEditPhoto }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
    {/* Image thumbnail — click to assign photos */}
    <Box
      onClick={() => onEditPhoto(index)}
      sx={{
        width: 100,
        height: 100,
        borderRadius: 2,
        bgcolor: colors.neutral[100],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1.5px dashed',
        borderColor: colors.neutral[300],
        flexShrink: 0,
        transition: 'border-color 0.15s',
        '&:hover': { borderColor: 'primary.main' },
        position: 'relative',
      }}
    >
      {variant.images[0] ? (
        <Box
          component="img"
          src={variant.images[0].base64}
          alt="Foto variante"
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <>
          <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 28, color: colors.neutral[400] }} />
          <Typography variant="caption" sx={{ color: colors.neutral[500], textAlign: 'center', px: 0.5, mt: 0.25 }}>
            Agregar foto
          </Typography>
        </>
      )}
    </Box>

    {/* Variant name in blue */}
    <Typography
      variant="subtitle1"
      sx={{ color: colors.brand.orange, fontWeight: 600, lineHeight: 1.4 }}
    >
      {variant.values.join(', ')}
    </Typography>
  </Box>
);

// ─── GainInput — editable % gain field ────────────────────────────────────────

interface GainInputProps {
  cost: string;
  suggestedPrice: string;
  onChange: (newSuggestedPrice: string, newMargin: string) => void;
}

const GainInput: React.FC<GainInputProps> = ({ cost, suggestedPrice, onChange }) => {
  const c = parseFloat(cost) || 0;
  const sp = parseFloat(suggestedPrice) || 0;
  const margin = c > 0 && sp > 0 ? ((sp - c) / sp) * 100 : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMarginPct = parseFloat(e.target.value.replace('%', '').trim()) || 0;
    if (c > 0 && newMarginPct > 0 && newMarginPct < 100) {
      // suggestedPrice = cost / (1 - margin/100)
      const newSP = c / (1 - newMarginPct / 100);
      onChange(newSP.toFixed(2), newMarginPct.toFixed(2));
    }
  };

  return (
    <TextField
      value={`${margin.toFixed(0)}`}
      onChange={handleChange}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        },
      }}
      sx={{ width: '100%', maxWidth: 120 }}
    />
  );
};

// ─── VariantsTable ─────────────────────────────────────────────────────────────

export const VariantsTable: React.FC<VariantsTableProps> = ({
  properties,
  variants,
}) => {
  const removeProperty = useProductFormStore((s) => s.removeProperty);
  const updateVariant = useProductFormStore((s) => s.updateVariant);
  const productPhotos = useProductFormStore((s) => s.productPhotos);

  // Edit drawer state
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Photo drawer state
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [photoSelected, setPhotoSelected] = useState<Set<string>>(new Set());

  const openEdit = (index: number) => setEditIndex(index);
  const closeEdit = () => setEditIndex(null);

  const openPhoto = (index: number) => {
    // Pre-select already assigned images by matching base64
    const variant = variants[index];
    const assignedBase64 = new Set(variant.images.map((img) => img.base64));
    const preSelected = new Set(
      productPhotos.filter((p) => assignedBase64.has(p.base64)).map((p) => p.id),
    );
    setPhotoSelected(preSelected);
    setPhotoIndex(index);
  };
  const closePhoto = () => {
    if (photoIndex !== null) {
      // Save selected photos to variant
      const selected = productPhotos.filter((p) => photoSelected.has(p.id));
      updateVariant(photoIndex, {
        images: selected.map((p) => ({ base64: p.base64, mimetype: p.mimetype })),
      });
    }
    setPhotoIndex(null);
    setPhotoSelected(new Set());
  };

  // Rows with stable index
  const rows = variants.map((v, i) => ({ ...v, _idx: i }));

  const columns: ColumnDef<(typeof rows)[number]>[] = [
    {
      key: 'variant',
      header: 'Variante',
      width: '260px',
      render: (row) => (
        <VariantCell
          variant={row}
          index={row._idx}
          onEditPhoto={openPhoto}
        />
      ),
    },
    {
      key: 'stock',
      header: 'Stock',
      width: '90px',
      render: (row) => (
        <StockInput
          value={row.stock}
          onChange={(val) => updateVariant(row._idx, { stock: val })}
        />
      ),
    },
    {
      key: 'cost',
      header: 'Precio',
      width: '130px',
      render: (row) => (
        <PriceInput
          value={Number(row.cost)}
          disabled
        />
      ),
    },
    {
      key: 'suggestedPrice',
      header: 'Precio de venta sugerido',
      width: '160px',
      render: (row) => (
        <PriceInput
          value={Number(row.suggestedPrice)}
          onChange={(val) => updateVariant(row._idx, { suggestedPrice: String(val) })}
        />
      ),
    },
    {
      key: 'gain',
      header: 'Ganancia',
      width: '130px',
      render: (row) => (
        <GainInput
          cost={row.cost}
          suggestedPrice={row.suggestedPrice}
          onChange={(newSP, newMargin) =>
            updateVariant(row._idx, { suggestedPrice: newSP, suggestedMargin: newMargin })
          }
        />
      ),
    },
    {
      key: 'visibility',
      width: '100px',
      header: '',
      render: (row) => <VisibilityChip visible={row.visible} />,
    },
    {
      key: 'actions',
      header: 'Acciones',
      width: '60px',
      align: 'right',
      render: (row) => (
        <Tooltip title="Editar variante">
          <IconButton size="small" onClick={() => openEdit(row._idx)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  if (properties.length === 0) return null;

  return (
    <>
      <Box>
        <PropertyChipsRow properties={properties} onRemoveProperty={removeProperty} />
        <DataTable
          columns={columns}
          rows={rows}
          getRowKey={(row) => row.values.join('-') + row._idx}
        />
      </Box>

      {/* Edit drawer */}
      <VariantEditDrawer
        open={editIndex !== null}
        onClose={closeEdit}
        variant={editIndex !== null ? variants[editIndex] : null}
        variantIndex={editIndex}
        onSave={(index, patch) => updateVariant(index, patch)}
      />

      {/* Photo picker drawer */}
      <VariantPhotosDrawer
        open={photoIndex !== null}
        onClose={closePhoto}
        variantLabel={photoIndex !== null ? variants[photoIndex].values.join(', ') : ''}
        productPhotos={productPhotos}
        selectedIds={photoSelected}
        onChange={setPhotoSelected}
      />
    </>
  );
};