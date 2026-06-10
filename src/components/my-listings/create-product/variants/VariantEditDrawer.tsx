import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import GenericDrawer from '@/components/ui/drawer/GenericDrawer';
import type { VariantFormValue } from '@/types/variant.type';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface VariantEditDrawerProps {
  open: boolean;
  onClose: () => void;
  variant: VariantFormValue | null;
  variantIndex: number | null;
  onSave: (index: number, patch: Partial<VariantFormValue>) => void;
}

type StockMode = 'unlimited' | 'limited';
type StockAdjustMode = 'add' | 'subtract' | 'replace';

// ─── Inner form — remounted via key when variant changes ───────────────────────

interface VariantEditFormProps {
  variant: VariantFormValue;
  variantIndex: number;
  onSave: (index: number, patch: Partial<VariantFormValue>) => void;
  onClose: () => void;
}

function VariantEditForm({ variant, variantIndex, onSave, onClose }: VariantEditFormProps) {
  // ── Prices — initialised once from props ──
  const [cost, setCost] = useState(variant.cost);
  const [suggestedPrice, setSuggestedPrice] = useState(variant.suggestedPrice);
  const [sku, setSku] = useState(variant.sku);
  const [barcode, setBarcode] = useState('');

  // ── Stock ──
  const [stockMode, setStockMode] = useState<StockMode>('limited');
  const [adjustMode, setAdjustMode] = useState<StockAdjustMode>('replace');
  const [adjustValue, setAdjustValue] = useState(String(variant.stock));
  const [applyToAll, setApplyToAll] = useState(false);

  // ── Margen editable ──
  const [marginInput, setMarginInput] = useState(() => {
    const c = parseFloat(variant.cost) || 0;
    const sp = parseFloat(variant.suggestedPrice) || 0;
    return c > 0 && sp > 0 ? ((sp - c) / c * 100).toFixed(0) : '';
  });

  // ── Dimensiones ──
  const [weight, setWeight] = useState(variant.weight ?? '');
  const [depth, setDepth] = useState(variant.depth ?? '');
  const [width, setWidth] = useState(variant.width ?? '');
  const [height, setHeight] = useState(variant.height ?? '');

  // ── Cuando cambia el margen, recalcula suggestedPrice ──
  const handleMarginChange = (val: string) => {
    setMarginInput(val);
    const m = parseFloat(val) || 0;
    const c = parseFloat(cost) || 0;
    if (c > 0 && m > 0) {
      setSuggestedPrice((c * (1 + m / 100)).toFixed(2));
    }
  };

  const computedNewStock = (): number => {
    const adj = parseInt(adjustValue, 10) || 0;
    if (adjustMode === 'add') return variant.stock + adj;
    if (adjustMode === 'subtract') return Math.max(0, variant.stock - adj);
    return adj; // replace
  };

  const handleSave = () => {
    const m = parseFloat(marginInput) || 0;
    const patch: Partial<VariantFormValue> = {
      cost,
      suggestedPrice,
      suggestedMargin: m.toFixed(2),
      sku,
      stock: stockMode === 'unlimited' ? 999999 : computedNewStock(),
      weight,
      depth,
      width,
      height,
    };
    onSave(variantIndex, patch);
    onClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

      {/* ── Precios ── */}
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h3">Precios</Typography>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Costo</Typography>
            <TextField fullWidth value={cost} onChange={(e) => setCost(e.target.value)}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Precio sugerido</Typography>
              <TextField fullWidth value={suggestedPrice} onChange={(e) => setSuggestedPrice(e.target.value)}
                slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Ganancia</Typography>
              <TextField fullWidth value={marginInput} onChange={(e) => handleMarginChange(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ── Códigos ── */}
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h3">Códigos</Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>SKU</Typography>
              <TextField
                fullWidth
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
              <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
                El SKU es un código que creás internamente para hacer un seguimiento de tus productos con variantes.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Código de barras</Typography>
              <TextField
                fullWidth
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <Typography variant="body2" sx={{ mt: 0.75, color: 'text.secondary' }}>
                El código de barras consta de 13 números y se utiliza para identificar un producto.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ── Stock ── */}
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h3">Stock</Typography>

          <RadioGroup
            value={stockMode}
            onChange={(_, v) => setStockMode(v as StockMode)}
          >
            <Box>
              <FormControlLabel
                value="unlimited"
                control={<Radio />}
                label={<Typography variant="h5">Ilimitado</Typography>}
                sx={{ width: '100%', justifyContent: 'space-between', mx: 0, flexDirection: 'row-reverse' }}
              />
              <Divider />
              <FormControlLabel
                value="limited"
                control={<Radio />}
                label={<Typography variant="h5">Limitado</Typography>}
                sx={{ width: '100%', justifyContent: 'space-between', mx: 0, flexDirection: 'row-reverse' }}
              />
            </Box>
          </RadioGroup>

          {stockMode === 'limited' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="subtitle2">Ajustar cantidad</Typography>

              <ToggleButtonGroup
                value={adjustMode}
                exclusive
                onChange={(_, v) => { if (v) setAdjustMode(v as StockAdjustMode); }}
                size="small"
              >
                <ToggleButton value="add" sx={{ borderRadius: '100px !important', px: 2, textTransform: 'none' }}>
                  Agregar
                </ToggleButton>
                <ToggleButton value="subtract" sx={{ borderRadius: '100px !important', px: 2, textTransform: 'none' }}>
                  Descontar
                </ToggleButton>
                <ToggleButton value="replace" sx={{ borderRadius: '100px !important', px: 2, textTransform: 'none' }}>
                  Reemplazar
                </ToggleButton>
              </ToggleButtonGroup>

              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto 1fr', alignItems: 'center', gap: 1.5 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Stock actual</Typography>
                  <TextField fullWidth value={variant.stock} disabled />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.75 }}>
                    {adjustMode === 'add' ? 'Agregar' : adjustMode === 'subtract' ? 'Descontar' : 'Reemplazar'}
                  </Typography>
                  <TextField
                    fullWidth
                    value={adjustValue}
                    onChange={(e) => setAdjustValue(e.target.value)}
                  />
                </Box>
                <Typography variant="h5" sx={{ mt: 2.5 }}>=</Typography>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Nuevo Stock</Typography>
                  <TextField fullWidth value={computedNewStock()} disabled />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Checkbox
                  checked={applyToAll}
                  onChange={(_, v) => setApplyToAll(v)}
                  sx={{ p: 0 }}
                />
                <Typography variant="body1">
                  {adjustMode === 'replace'
                    ? 'Reemplazar stock en todas las variantes'
                    : adjustMode === 'add'
                      ? 'Agregar stock en todas las variantes'
                      : 'Descontar stock en todas las variantes'}
                </Typography>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h3">Peso y dimensiones</Typography>
          <Typography variant="body2" color="text.secondary">
            Cargá el peso y medidas del producto con tu embalaje.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Peso</Typography>
              <TextField fullWidth value={weight} onChange={(e) => setWeight(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> } }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Profundidad</Typography>
              <TextField fullWidth value={depth} onChange={(e) => setDepth(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Ancho</Typography>
              <TextField fullWidth value={width} onChange={(e) => setWidth(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }} />
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.75 }}>Alto</Typography>
              <TextField fullWidth value={height} onChange={(e) => setHeight(e.target.value)}
                slotProps={{ input: { endAdornment: <InputAdornment position="end">cm</InputAdornment> } }} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Button variant="contained" fullWidth onClick={handleSave}>
        Guardar cambios
      </Button>
    </Box>
  );
}

// ─── VariantEditDrawer — shell that provides the key ──────────────────────────

export default function VariantEditDrawer({
  open,
  onClose,
  variant,
  variantIndex,
  onSave,
}: VariantEditDrawerProps) {
  return (
    <GenericDrawer
      open={open}
      onClose={onClose}
      title={<Typography variant="h2">{variant?.values.join(', ') ?? ''}</Typography>}
      width={460}
    >
      {variant !== null && variantIndex !== null && (
        <VariantEditForm
          key={variantIndex}
          variant={variant}
          variantIndex={variantIndex}
          onSave={onSave}
          onClose={onClose}
        />
      )}
    </GenericDrawer>
  );
}