import React from 'react';
import { TextField, InputAdornment } from '@mui/material';

interface PriceInputProps {
  value: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  /** Se llama al perder el foco — usar para confirmar el valor y hacer el request */
  onBlur?: () => void;
}

export const PriceInput: React.FC<PriceInputProps> = ({
  value,
  disabled,
  onChange,
  onBlur,
}) => (
  <TextField
    value={value}
    disabled={disabled}
    onChange={(e) => onChange?.(Number(e.target.value))}
    onBlur={onBlur}
    slotProps={{
      input: {
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      },
    }}
    sx={{ width: '100%', maxWidth: 120 }}
  />
);