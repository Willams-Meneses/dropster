import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const TagsSeoSection = () => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="h3">Tags, Marca y SEO</Typography>
        <Typography variant="body1">
          Creá palabras clave y facilitá la búsqueda de este producto en tu tienda y en los motores de búsqueda de Google.
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            sx={{
              height: '36px',
              px:'16px'
            }}
          >
            Editar
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};