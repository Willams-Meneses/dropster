import React from 'react';
import { Box } from '@mui/material';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import { colors } from '@/theme/palette';
import type { User } from '@/types/auth.types';
import { ProfileMenuItem } from './ProfileMenuItem';

interface ProfileMenuListProps {
  user: User;
  onNavigate: (path: string) => void;
}

// El "!" naranja indica sección incompleta. Chequeo simple de presencia de los
// campos que pide cada pantalla.
const isPersonalInfoIncomplete = (user: User): boolean => !user.dni || !user.phone;

const isAddressIncomplete = (user: User): boolean =>
  !user.street || !user.height || !user.city || !user.province || !user.postalCode;

export const ProfileMenuList: React.FC<ProfileMenuListProps> = ({ user, onNavigate }) => {
  const isProvider = user.role === 'PROVIDER';

  // Textos y rutas dinámicas según el rol del usuario
  const addressTitle = isProvider ? 'Dirección de despacho' : 'Dirección de recepción';
  const addressDescription = isProvider 
    ? 'Dirección declarada para el despacho de tus productos.' 
    : 'Dirección de tu local para recibir la mercadería que compres para revender.';
  const addressRoute = '/dashboard/my-profile/business-address'; // Usamos la ruta neutra

  return (
    <Box
      sx={{
        backgroundColor: colors.white,
        borderRadius: '14px',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <ProfileMenuItem
        icon={<BadgeOutlinedIcon fontSize="small" />}
        title="Información personal"
        description="Datos referentes a tu persona ya sea física o jurídica."
        showWarning={isPersonalInfoIncomplete(user)}
        showDivider={true}
        onClick={() => onNavigate('/dashboard/my-profile/personal-data')}
      />

      <ProfileMenuItem
        icon={<WarehouseOutlinedIcon fontSize="small" />}
        title={addressTitle}
        description={addressDescription}
        showWarning={isAddressIncomplete(user)}
        showDivider={false}
        onClick={() => onNavigate(addressRoute)}
      />
    </Box>
  );
};