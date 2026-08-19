import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { colors } from '@/theme/palette';
import type { User } from '@/types/auth.types';

interface ProfileHeaderCardProps {
  user: User;
}

// TODO: no hay endpoint de upload de avatar todavía — el botón de cámara queda
// decorativo (sin onClick) hasta que se defina cómo se sube/guarda la foto.
const ROLE_LABEL: Record<string, string> = {
  PROVIDER: 'Proveedor',
  DROPSHIPPER: 'Dropshipper',
};

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({ user }) => {
  const initial = user.firstName?.charAt(0).toUpperCase() ?? '?';
  const roleLabel = user.role ? (ROLE_LABEL[user.role] ?? user.role) : 'Usuario';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2.5,
        backgroundColor: colors.white,
        borderRadius: '14px',
        boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.08)',
        p: 3,
        mb: 3,
      }}
    >
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: '#EDE9FE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: '28px', fontWeight: 600, color: '#6D28D9' }}>{initial}</Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: -2,
            bottom: -2,
            width: 26,
            height: 26,
            borderRadius: '50%',
            backgroundColor: colors.white,
            border: `1px solid ${colors.neutral[300]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PhotoCameraIcon sx={{ fontSize: 14, color: colors.content.body }} />
        </Box>
      </Box>

      <Box>
        <Typography variant="h3">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {user.email}
        </Typography>
        <Chip label={roleLabel} variant="outlined" size="small" />
      </Box>
    </Box>
  );
};