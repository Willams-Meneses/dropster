import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

interface PriceInputProps {
  value: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export const PriceInput: React.FC<PriceInputProps> = ({ value, disabled, onChange }) => (
  <TextField
    value={value}
    disabled={disabled}
    onChange={(e) => onChange?.(Number(e.target.value))}
    slotProps={{
      input: {
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      },
    }}
    sx={{ width: '100%', maxWidth: 120 }}
  />
);