import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GenericDrawer from '../ui/drawer/GenericDrawer';

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

type StoreOptionId = 'tiendanube' | 'shopify' | 'csv';

interface StoreOption {
  id: StoreOptionId;
  label: string;
  subtitle?: string;
  logo?: React.ReactNode;
}

interface AddStoreDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelectOption: (id: StoreOptionId) => void;
}

// ---------------------------------------------------------------------------
// Logos inline (svg simple para no depender de assets externos)
// ---------------------------------------------------------------------------

function TiendanubeLogo() {
  return (
    <Box component="img"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Tiendanube_logo.svg/320px-Tiendanube_logo.svg.png"
      alt="Tiendanube"
      sx={{ height: 28, objectFit: 'contain' }}
    />
  );
}

// ---------------------------------------------------------------------------
// Datos de opciones
// ---------------------------------------------------------------------------

const STORE_OPTIONS: StoreOption[] = [
  {
    id: 'tiendanube',
    label: 'Tiendanube',
    logo: <TiendanubeLogo />,
  },
];

// ---------------------------------------------------------------------------
// Componente de opción individual
// ---------------------------------------------------------------------------

interface OptionRowProps {
  option: StoreOption;
  onClick: () => void;
}

function OptionRow({ option, onClick }: OptionRowProps) {
  const hasSubtitle = Boolean(option.subtitle);

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: hasSubtitle ? 2.5 : 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        textAlign: 'left',
        transition: 'border-color 0.2s, background-color 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'grey.100',
        },
      }}
    >
      {/* Logo / ícono */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
        {hasSubtitle ? (
          // CSV: logo a la izquierda + texto a la derecha
          <>
            {option.logo}
            <Box>
              <Typography variant="h6">{option.label}</Typography>
              <Typography variant="caption">{option.subtitle}</Typography>
            </Box>
          </>
        ) : (
          // Tiendanube / Shopify: logo centrado
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            {option.logo}
          </Box>
        )}
      </Box>

      <ChevronRightIcon sx={{ color: 'text.secondary', ml: 1, flexShrink: 0 }} />
    </ButtonBase>
  );
}

// ---------------------------------------------------------------------------
// AddStoreDrawer
// ---------------------------------------------------------------------------

export default function AddStoreDrawer({ open, onClose, onSelectOption }: AddStoreDrawerProps) {
  return (
    <GenericDrawer
      open={open}
      onClose={onClose}
      title="Nueva tienda"
      width={420}
    >
      <Typography variant="body1" sx={{ mb: 3 }}>
        Nos hemos integrado con los siguientes marketplaces y plataformas para optimizar las operaciones y
        aumentar la productividad de tus ventas.
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Elegí una opción para vincular tu propia tienda:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {STORE_OPTIONS.map((option) => (
          <OptionRow
            key={option.id}
            option={option}
            onClick={() => onSelectOption(option.id)}
          />
        ))}
      </Box>
    </GenericDrawer>
  );
}