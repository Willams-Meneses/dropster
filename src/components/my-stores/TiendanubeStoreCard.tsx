import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { DropshipperStore } from '@/types/store.type';
import { useNavigate } from 'react-router-dom';
import tiendaNubeLogo from '@/assets/svg/tienda-nube-logo.svg';
import miTiendaDefault from '@/assets/mi-tienda-default.png'

interface TiendanubeStoreCardProps {
  store: DropshipperStore;
}

export default function TiendanubeStoreCard({ store }: TiendanubeStoreCardProps) {
  const displayName = `Tienda #${store.storeName}`;
  const navigate = useNavigate();

  return (
    <Card
      sx={{ width: 220, cursor: 'pointer', borderRadius: 3, boxShadow: 2 }}
      onClick={() => void navigate('/dashboard/my-stores/detail')}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>

        {/* Área de imagen con logo posicionado encima */}
        <Box
          sx={{
            position: 'relative',         // ← contexto para el logo absoluto
            borderRadius: 2,
            height: 160,
            background: 'linear-gradient(135deg, #f5f0f8 0%, #ede8f5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Imagen central */}
          <Box
            component="img"
            src={store.logoUrl || miTiendaDefault}
            alt=""
            sx={{ width: 45, height: 45, objectFit: 'contain' }}
          />

          {/* Logo con texto — dentro del área, esquina superior derecha */}
          <Box
            sx={{
              position: 'absolute',       // ← encima del área
              top: 0,
              right: 0,
              bgcolor: 'white',
              borderRadius: '0 0 0 12px',
              px: "12px",
              py: "12px",
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={tiendaNubeLogo}
              alt="Tiendanube"
              sx={{ height: 18, objectFit: 'contain' }}
            />
          </Box>
        </Box>

        {/* Nombre de la tienda */}
        <Box sx={{ pt: 2 }}>
          <Typography variant="h6" sx={{
            fontWeight: 600
          }}>
            {displayName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}