import { useState } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useProductFormStore } from '@/store/productForm.store';
import { VariantsTable } from './VariantsTable';
import { PropertiesDrawer } from './PropertiesDrawer';


export const VariantsSection = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { properties, variants, addProperty, updateProperty, removeProperty } =
    useProductFormStore();

  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="h3">Variantes</Typography>
        <Typography variant="body1">
          Combiná diferentes propiedades de tu producto. Ejemplo: color + tamaño.
        </Typography>

        {properties.length > 0 && (
          <VariantsTable properties={properties} variants={variants} />
        )}

        <Box>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineRoundedIcon />}
            onClick={() => setDrawerOpen(true)}
            sx={{ height: '36px', px: '16px' }}
          >
            Agregar variantes
          </Button>
        </Box>
      </CardContent>

      <PropertiesDrawer
        open={drawerOpen}
        properties={properties}
        onClose={() => setDrawerOpen(false)}
        onAddProperty={addProperty}
        onUpdateProperty={updateProperty}
        onRemoveProperty={removeProperty}
      />
    </Card>
  );
};