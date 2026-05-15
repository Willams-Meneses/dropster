import { Box, Button, Typography, Alert } from '@mui/material';
import RoleCard from '@/components/auth/register/RoleCard';
import { useRegister } from '@/hooks/useRegister';
import dropshipperImg from '@/assets/svg/dropshipper-role-auth.svg';
import providerImg from '@/assets/svg/provider-role-auth.svg';
import backgroundImg from '@/assets/svg/background-select-role-auth.svg';

const RoleSelectionPage = () => {
  const { selectedRole, setSelectedRole, serverError, isSubmittingRole, onSubmitRole, Role } = useRegister();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pl: { xs: 2, md: 8 },
        pr: 2,
        py: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 560,
          backgroundColor: 'background.paper',
          borderRadius: '24px',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxHeight: '95vh',
          overflowY: 'auto',
        }}
      >
        <Typography sx={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'primary.main' }}>
          Droppers
        </Typography>

        <Typography variant="h1">¡Te damos la bienvenida!</Typography>

        <Typography variant="h3">Elegí como querés usar Droppers</Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          Podés ser Dropshipper y Proveedor al mismo tiempo. También podes comenzar como alguna de las dos opciones y luego podrás añadir otro rol si te hace falta.
        </Typography>

        {serverError && <Alert severity="error">{serverError}</Alert>}

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <RoleCard
            image={dropshipperImg}
            title="Como Dropshipper"
            description="Quiero conectar mi tienda online y vender productos de diferentes proveedores de Droppers."
            selected={selectedRole === Role.DROPSHIPPER}
            onClick={() => setSelectedRole(Role.DROPSHIPPER)}
          />
          <RoleCard
            image={providerImg}
            title="Como Proveedor"
            description="Quiero agregar a Droppers productos que tengo en stock para que los Dropshippers los vendan."
            selected={selectedRole === Role.PROVIDER}
            onClick={() => setSelectedRole(Role.PROVIDER)}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          disabled={isSubmittingRole || !selectedRole}
          onClick={() => void onSubmitRole()}
          sx={{ mt: 1 }}
        >
          {isSubmittingRole ? 'Guardando...' : 'Comenzar'}
        </Button>
      </Box>
    </Box>
  );
};

export default RoleSelectionPage;