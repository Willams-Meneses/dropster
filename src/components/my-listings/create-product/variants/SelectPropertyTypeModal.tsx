import React from 'react';
import {
  Box,
  Modal,
  Typography,
  Radio,
  IconButton,
  ButtonBase,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { PropertyType } from '@/types/variant.type';

interface SelectPropertyTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: PropertyType) => void;
}

const OPTIONS: { type: PropertyType; label: string }[] = [
  { type: 'color',  label: 'Color'  },
  { type: 'talle',  label: 'Talle'  },
  { type: 'modelo', label: 'Modelo' },
];

export const SelectPropertyTypeModal: React.FC<SelectPropertyTypeModalProps> = ({
  open,
  onClose,
  onSelect,
}) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -30%)',
        width: 320,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2 }}>
        <Typography variant="h5">Selecciona una opción</Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      {/* Options */}
      {OPTIONS.map((opt) => (
        <ButtonBase
          key={opt.type}
          onClick={() => onSelect(opt.type)}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 2,
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          <Typography variant="body1">{opt.label}</Typography>
          <Radio size="small" disableRipple sx={{ p: 0 }} />
        </ButtonBase>
      ))}
    </Box>
  </Modal>
);