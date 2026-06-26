import React, { useState, useCallback } from 'react';
import {
  Box, Typography, Select, MenuItem, IconButton, Button,
  TextField, Radio, Divider, FormControl,
} from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import GenericDrawer from '@/components/ui/drawer/GenericDrawer';
import type { Property, PropertyType, ColorValue } from '@/types/variant.type';
import { COLOR_PRESETS, TALLE_PRESETS } from '@/types/variant.type';

interface NewPropertyDrawerProps {
  open: boolean;
  initialType: PropertyType;
  /** When editing an existing property, pass it here */
  initialProperty?: Property;
  onClose: () => void;
  onCreate: (prop: Property) => void;
}

// ─── Color sub-form ────────────────────────────────────────────────────────────

interface ColorFormProps {
  selected: ColorValue[];
  onChange: (vals: ColorValue[]) => void;
}

const ColorForm: React.FC<ColorFormProps> = ({ selected, onChange }) => {
  const addCustom = () => onChange([...selected, { name: '', hex: '#000000' }]);
  const remove = (i: number) => onChange(selected.filter((_, idx) => idx !== i));
  const updateName = (i: number, name: string) =>
    onChange(selected.map((v, idx) => (idx === i ? { ...v, name } : v)));
  const togglePreset = (preset: ColorValue) => {
    const exists = selected.some((v) => v.name === preset.name);
    onChange(exists ? selected.filter((v) => v.name !== preset.name) : [...selected, preset]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {selected.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 0.5 }}>Colores seleccionados</Typography>
          <Typography variant="caption">Si no encontrás el color que necesitás, podés crearlo.</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1.5 }}>
            {selected.map((val, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DragIndicatorIcon sx={{ color: 'text.secondary', fontSize: 18, cursor: 'grab' }} />
                <TextField
                  value={val.name}
                  onChange={(e) => updateName(i, e.target.value)}
                  placeholder="Nombre del color"
                  sx={{ flex: 1 }}
                />
                <IconButton size="small" onClick={() => remove(i)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Button
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={addCustom}
            sx={{ mt: 1, px: 0, color: 'primary.main', fontWeight: 500 }}
          >
            Agregar color personalizado
          </Button>
        </Box>
      )}

      <Divider />

      <Box>
        <Typography variant="h6" sx={{ mb: 1.5 }}>Colores disponibles</Typography>
        {COLOR_PRESETS.map((preset) => {
          const isChecked = selected.some((v) => v.name === preset.name);
          return (
            <Box
              key={preset.name}
              onClick={() => togglePreset(preset)}
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                py: 1, cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' },
                borderRadius: 1, px: 0.5,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{
                  width: 24, height: 24, borderRadius: '50%', bgcolor: preset.hex,
                  border: '1px solid', borderColor: preset.hex === '#FFFFFF' ? 'divider' : 'transparent',
                  flexShrink: 0,
                }} />
                <Typography variant="body1">{preset.name}</Typography>
              </Box>
              <Radio checked={isChecked} size="small" disableRipple sx={{ p: 0 }} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

// ─── Talle sub-form ────────────────────────────────────────────────────────────

interface TalleFormProps {
  selected: string[];
  onChange: (vals: string[]) => void;
}

const TalleForm: React.FC<TalleFormProps> = ({ selected, onChange }) => {
  const addCustom = () => onChange([...selected, '']);
  const remove = (i: number) => onChange(selected.filter((_, idx) => idx !== i));
  const updateVal = (i: number, val: string) =>
    onChange(selected.map((v, idx) => (idx === i ? val : v)));
  const togglePreset = (val: string) => {
    const exists = selected.includes(val);
    onChange(exists ? selected.filter((v) => v !== val) : [...selected, val]);
  };
  const selectAll = (group: string[]) => {
    const missing = group.filter((v) => !selected.includes(v));
    onChange([...selected, ...missing]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {selected.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 0.5 }}>Talles seleccionados</Typography>
          <Typography variant="caption">Si no encontrás el talle que necesitás, podés crearlo.</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1.5 }}>
            {selected.map((val, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DragIndicatorIcon sx={{ color: 'text.secondary', fontSize: 18, cursor: 'grab' }} />
                <TextField
                  value={val}
                  onChange={(e) => updateVal(i, e.target.value)}
                  placeholder="Nombre del talle"
                  sx={{ flex: 1 }}
                />
                <IconButton size="small" onClick={() => remove(i)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Button
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={addCustom}
            sx={{ mt: 1, px: 0, color: 'primary.main', fontWeight: 500 }}
          >
            Agregar talle personalizado
          </Button>
        </Box>
      )}

      <Divider />

      {Object.entries(TALLE_PRESETS).map(([groupName, groupVals]) => (
        <Box key={groupName}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6">
              {groupName === 'Adultos' ? 'Talles básicos' : groupName}
            </Typography>
            {groupName === 'Adultos' && (
              <Button
                size="small"
                onClick={() => selectAll(groupVals)}
                sx={{ px: 0, color: 'primary.main', fontWeight: 500, minWidth: 'auto' }}
              >
                Seleccionar todos
              </Button>
            )}
          </Box>
          {groupVals.map((val) => (
            <Box
              key={val}
              onClick={() => togglePreset(val)}
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                py: 1, cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' },
                borderRadius: 1, px: 0.5,
              }}
            >
              <Typography variant="body1">{val}</Typography>
              <Radio checked={selected.includes(val)} size="small" disableRipple sx={{ p: 0 }} />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

// ─── Modelo sub-form ───────────────────────────────────────────────────────────

interface ModeloFormProps {
  selected: string[];
  onChange: (vals: string[]) => void;
}

const ModeloForm: React.FC<ModeloFormProps> = ({ selected, onChange }) => {
  const add = () => onChange([...selected, '']);
  const remove = (i: number) => onChange(selected.filter((_, idx) => idx !== i));
  const update = (i: number, val: string) =>
    onChange(selected.map((v, idx) => (idx === i ? val : v)));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {selected.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 1.5 }}>Modelos</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {selected.map((val, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DragIndicatorIcon sx={{ color: 'text.secondary', fontSize: 18, cursor: 'grab' }} />
                <TextField
                  value={val}
                  onChange={(e) => update(i, e.target.value)}
                  placeholder="Nombre del modelo"
                  autoFocus={i === selected.length - 1}
                  sx={{ flex: 1 }}
                />
                <IconButton size="small" onClick={() => remove(i)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <Button
        startIcon={<AddCircleOutlineRoundedIcon />}
        onClick={add}
        sx={{ px: 0, alignSelf: 'flex-start', color: 'primary.main', fontWeight: 500 }}
      >
        Agregar modelo
      </Button>
    </Box>
  );
};

// ─── NewPropertyDrawer ─────────────────────────────────────────────────────────

const LABELS: Record<PropertyType, string> = {
  color: 'Color',
  talle: 'Talle',
  modelo: 'Modelo',
};

function initialColorVals(prop?: Property): ColorValue[] {
  if (prop?.type === 'color') return prop.values;
  return [];
}
function initialTalleVals(prop?: Property): string[] {
  if (prop?.type === 'talle') return prop.values;
  return [];
}
function initialModeloVals(prop?: Property): string[] {
  if (prop?.type === 'modelo') return prop.values;
  return [];
}

export const NewPropertyDrawer: React.FC<NewPropertyDrawerProps> = ({
  open,
  initialType,
  initialProperty,
  onClose,
  onCreate,
}) => {
  const isEditing = !!initialProperty;

  const [type, setType] = useState<PropertyType>(initialType);
  const [colorVals, setColorVals] = useState<ColorValue[]>(() => initialColorVals(initialProperty));
  const [talleVals, setTalleVals] = useState<string[]>(() => initialTalleVals(initialProperty));
  const [modeloVals, setModeloVals] = useState<string[]>(() => initialModeloVals(initialProperty));

  const canCreate = useCallback(() => {
    if (type === 'color') return colorVals.length > 0 && colorVals.every((v) => v.name.trim());
    if (type === 'talle') return talleVals.length > 0 && talleVals.every((v) => v.trim());
    if (type === 'modelo') return modeloVals.length > 0 && modeloVals.every((v) => v.trim());
    return false;
  }, [type, colorVals, talleVals, modeloVals]);

  const handleCreate = () => {
    if (!canCreate()) return;
    let prop: Property;
    if (type === 'color') prop = { type: 'color', name: 'Color', values: colorVals };
    else if (type === 'talle') prop = { type: 'talle', name: 'Talle', values: talleVals };
    else prop = { type: 'modelo', name: 'Modelo', values: modeloVals };
    onCreate(prop);
    onClose();
  };

  const header = (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mr: 1 }}>
      <Typography variant="h2">
        {isEditing ? 'Editar propiedad' : 'Nueva propiedad'}
      </Typography>
      <Button
        variant="contained"
        size="small"
        disabled={!canCreate()}
        onClick={handleCreate}
        sx={{ px: '12px', py: '4.8px' }}
      >
        {isEditing ? 'Guardar' : 'Crear'}
      </Button>
    </Box>
  );

  return (
    <GenericDrawer
      open={open}
      onClose={onClose}
      title={header}
      width={420}
      footer={undefined}
    >
      {/* Property type selector — locked when editing */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Propiedad</Typography>
        <FormControl fullWidth>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType)}
            disabled={isEditing}
            sx={{ borderRadius: '12px' }}
          >
            {(Object.keys(LABELS) as PropertyType[]).map((t) => (
              <MenuItem key={t} value={t}>{LABELS[t]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {type === 'color' && <ColorForm selected={colorVals} onChange={setColorVals} />}
      {type === 'talle' && <TalleForm selected={talleVals} onChange={setTalleVals} />}
      {type === 'modelo' && <ModeloForm selected={modeloVals} onChange={setModeloVals} />}
    </GenericDrawer>
  );
};