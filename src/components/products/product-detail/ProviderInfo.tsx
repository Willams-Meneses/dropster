import { Avatar, Box, Button, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { ProductProvider } from '@/types/product.type';
import { ChipCustom } from '@/components/ui/ChipCustom';

// TODO: reemplazar por foto real del proveedor cuando el back la exponga
const HARDCODED_AVATAR = 'https://i.pravatar.cc/150?img=12';
// TODO: reemplazar por mapa/ubicación real (lat/lng o imagen estática de Maps)
const HARDCODED_MAP_IMAGE =
  'https://maps.googleapis.com/maps/api/staticmap?center=-24.18,-65.30&zoom=4&size=400x200';

interface ProviderInfoProps {
  provider: ProductProvider;
}

const cardSx = {
  border: '1px solid',
  borderColor: 'grey.300',
  borderRadius: 3,
  p: 2.5,
};

export const ProviderInfo = ({ provider }: ProviderInfoProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ ...cardSx, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Avatar src={HARDCODED_AVATAR} sx={{ width: 64, height: 64 }} />
        <Typography variant="caption">Nro de proveedor:</Typography>
        <Typography variant="subtitle1">{provider.id.slice(0, 10)}</Typography>

        <ChipCustom
          label="Proveedor destacado"
          icon={(props) => <VerifiedIcon sx={{ color: 'warning.main', fontSize: props.size }} />}
          textColor="#C44010"
          backgroundColor="transparent"
        />

        <Box sx={{ display: 'flex', gap: 3, pt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ color: 'warning.main', fontSize: 18 }} />
              <Typography variant="h6">4.7</Typography>
            </Box>
            <Typography variant="caption" sx={{ textAlign: 'center' }}>
              Promedio de valoración
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ color: 'success.main', fontSize: 18 }} />
            <Typography variant="caption" sx={{ textAlign: 'center' }}>
              Despacha sus productos a tiempo
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="h6">+1000</Typography>
            <Typography variant="caption" sx={{ textAlign: 'center' }}>
              Ventas concretadas
            </Typography>
          </Box>
        </Box>

        <Button variant="outlined" color="primary" size="small" sx={{ mt: 1 }}>
          Más productos del vendedor (+50)
        </Button>
      </Box>

      <Box sx={cardSx}>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          Despachado desde:
        </Typography>
        <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative', border: '1px solid', borderColor: 'grey.300' }}>
          <Box
            component="img"
            src={HARDCODED_MAP_IMAGE}
            alt="Mapa de despacho"
            sx={{ width: '100%', display: 'block' }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              p: 1.5,
            }}
          >
            <Typography variant="body1" sx={{ color: 'white' }}>
              San Salvador de Jujuy, Jujuy, Argentina
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, cursor: 'pointer' }}>
          ¿Por qué informamos esto?
        </Typography>
      </Box>
    </Box>
  );
};