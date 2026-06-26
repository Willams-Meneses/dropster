import React, { useState } from 'react';
import { Box, Typography, Divider, ButtonBase, Chip } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GenericDrawer from '@/components/ui/drawer/GenericDrawer';
import type { Property, PropertyType } from '@/types/variant.type';
import { SelectPropertyTypeModal } from './SelectPropertyTypeModal';
import { NewPropertyDrawer } from './NewPropertyDrawer';
import { colors } from '@/theme/palette';

interface PropertiesDrawerProps {
  open: boolean;
  properties: Property[];
  onClose: () => void;
  onAddProperty: (prop: Property) => void;
  onUpdateProperty: (index: number, prop: Property) => void;
  onRemoveProperty: (index: number) => void;
}

export const PropertiesDrawer: React.FC<PropertiesDrawerProps> = ({
  open,
  properties,
  onClose,
  onAddProperty,
  onUpdateProperty,
}) => {
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [newDrawerOpen, setNewDrawerOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<PropertyType>('color');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleTypeSelected = (type: PropertyType) => {
    setSelectedType(type);
    setSelectModalOpen(false);
    setEditingIndex(null);
    setNewDrawerOpen(true);
  };

  const handleEditProperty = (index: number) => {
    setSelectedType(properties[index].type);
    setEditingIndex(index);
    setNewDrawerOpen(true);
  };

  const handleSave = (prop: Property) => {
    if (editingIndex !== null) {
      onUpdateProperty(editingIndex, prop);
    } else {
      onAddProperty(prop);
    }
  };

  const handleCloseNewDrawer = () => {
    setNewDrawerOpen(false);
    setEditingIndex(null);
  };

  return (
    <>
      <GenericDrawer
        open={open}
        onClose={onClose}
        title={<Typography variant="h2">Propiedades</Typography>}
        width={420}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {properties.map((prop, idx) => (
            <React.Fragment key={prop.type + idx}>
              <ButtonBase
                onClick={() => handleEditProperty(idx)}
                sx={{
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  py: 2, width: '100%', textAlign: 'left',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>{prop.name}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {prop.type === 'color'
                      ? prop.values.map((cv) => (
                        <Box
                          key={cv.name}
                          sx={{
                            width: 28, height: 28, borderRadius: '50%',
                            bgcolor: cv.hex, border: '1px solid',
                            borderColor: cv.hex === '#FFFFFF' ? 'divider' : 'transparent',
                          }}
                        />
                      ))
                      : prop.values.map((v) => (
                        <Chip
                          key={v} label={v} size="small" variant="outlined"
                          sx={{ borderColor: colors.neutral[300] }}
                        />
                      ))}
                  </Box>
                </Box>
                <ChevronRightIcon sx={{ color: 'text.secondary', mt: 0.5 }} />
              </ButtonBase>
              <Divider />
            </React.Fragment>
          ))}
        </Box>

        <ButtonBase
          onClick={() => setSelectModalOpen(true)}
          sx={{
            display: 'flex', alignItems: 'center', gap: 1,
            py: 2, color: 'primary.main', borderRadius: 1,
          }}
        >
          <AddCircleOutlineRoundedIcon fontSize="small" />
          <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 500 }}>
            Agregar propiedad
          </Typography>
        </ButtonBase>
      </GenericDrawer>

      <SelectPropertyTypeModal
        open={selectModalOpen}
        onClose={() => setSelectModalOpen(false)}
        onSelect={handleTypeSelected}
      />
      
      <NewPropertyDrawer
        key={editingIndex !== null ? `edit-${editingIndex}` : 'create'}
        open={newDrawerOpen}
        initialType={selectedType}
        initialProperty={editingIndex !== null ? properties[editingIndex] : undefined}
        onClose={handleCloseNewDrawer}
        onCreate={handleSave}
      />
    </>
  );
};