import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export const VariantsSection = () => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="h3">Variantes</Typography>
        <Typography variant="body1">
          Combiná diferentes propiedades de tu producto. Ejemplo: color + tamaño.
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlineRoundedIcon />}
            sx={{
              height:'36px',
              px:'16px'
            }}
          >
            Agregar variantes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};