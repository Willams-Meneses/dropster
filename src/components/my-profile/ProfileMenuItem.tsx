import React from 'react';
import { Box, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { colors } from '@/theme/palette';

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  showWarning?: boolean;
  showDivider?: boolean;
  onClick: () => void;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  title,
  description,
  showWarning = false,
  showDivider = true,
  onClick,
}) => (
  <Box
    onClick={onClick}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      px: 3,
      py: 2.5,
      cursor: 'pointer',
      borderBottom: showDivider ? `1px solid ${colors.neutral[300]}` : 'none',
      '&:hover': {
        backgroundColor: colors.neutral[100],
      },
    }}
  >
    <Box sx={{ position: 'relative', flexShrink: 0 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: `1px solid ${colors.neutral[300]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.content.body,
        }}
      >
        {icon}
      </Box>
      {showWarning && (
        <Box
          sx={{
            position: 'absolute',
            right: -2,
            bottom: -2,
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: colors.status.warning,
            border: `2px solid ${colors.white}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: '10px', color: colors.white, fontWeight: 700, lineHeight: 1 }}>!</Typography>
        </Box>
      )}
    </Box>

    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>

    <ChevronRightIcon sx={{ color: colors.content.body }} />
  </Box>
);