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
// campos que pide cada pantalla — ajustar si alguno de estos campos pasa a ser
// realmente opcional para el negocio.
const isPersonalInfoIncomplete = (user: User): boolean => !user.dni || !user.phone;

const isDispatchAddressIncomplete = (user: User): boolean =>
  !user.street || !user.height || !user.city || !user.province || !user.postalCode;

export const ProfileMenuList: React.FC<ProfileMenuListProps> = ({ user, onNavigate }) => {
  const isProvider = user.role === 'PROVIDER';

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
        showDivider={isProvider}
        onClick={() => onNavigate('/dashboard/my-profile/personal-data')}
      />

      {isProvider && (
        <ProfileMenuItem
          icon={<WarehouseOutlinedIcon fontSize="small" />}
          title="Dirección de despacho"
          description="Dirección declarada para el despacho de productos."
          showWarning={isDispatchAddressIncomplete(user)}
          showDivider={false}
          onClick={() => onNavigate('/dashboard/my-profile/dispatch-address')}
        />
      )}
    </Box>
  );
};