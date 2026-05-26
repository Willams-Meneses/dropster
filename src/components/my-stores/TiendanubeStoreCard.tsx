import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { DropshipperStore } from '@/types/store.type';

interface TiendanubeStoreCardProps {
  store: DropshipperStore;
}

// Logo oficial de Tiendanube
function TiendanubeLogo() {
  return (
    <Box
      component="img"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Tiendanube_logo.svg/320px-Tiendanube_logo.svg.png"
      alt="Tiendanube"
      sx={{ height: 20, objectFit: 'contain' }}
    />
  );
}

// Ícono central de Tiendanube (la nube con gradiente)
function TiendanubeIcon() {
  return (
    <Box
      component="img"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Tiendanube_logo.svg/320px-Tiendanube_logo.svg.png"
      alt=""
      sx={{ width: 80, height: 80, objectFit: 'contain', opacity: 0.15 }}
    />
  );
}

export default function TiendanubeStoreCard({ store }: TiendanubeStoreCardProps) {
  // TN no devuelve el nombre de la tienda en el OAuth — mostramos el store ID
  // Si en el futuro hacés un GET a la API de TN para traer el nombre, reemplazás acá
  const displayName = `Tienda #${store.tiendanubeStoreId}`;

  return (
    <Card sx={{ width: 220, cursor: 'default' }}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        {/* Header con logo */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            px: 2,
            pt: 2,
            pb: 1,
          }}
        >
          <TiendanubeLogo />
        </Box>

        {/* Área central con ícono de fondo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            mx: 2,
            borderRadius: 2,
            height: 140,
            overflow: 'hidden',
          }}
        >
          <TiendanubeIcon />
        </Box>

        {/* Nombre de la tienda */}
        <Box sx={{ px: 2, pt: 2, pb: 2 }}>
          <Typography variant="h6">{displayName}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}