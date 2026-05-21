import React from 'react';
import { TextField } from '@mui/material';

interface StockInputProps {
  value: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export const StockInput: React.FC<StockInputProps> = ({ value, disabled, onChange }) => (
  <TextField
    value={value}
    disabled={disabled}
    onChange={(e) => onChange?.(Number(e.target.value))}
    sx={{ width: '100%', maxWidth: 80 }}
  />
);