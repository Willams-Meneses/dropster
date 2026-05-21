import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  titleIcon?: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  titleIcon,
  description,
  actions,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mb: 3,
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {titleIcon}
          <Typography variant="h2">{title}</Typography>
        </Box>
        {description && (
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>

      {actions && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
          {actions}
        </Box>
      )}
    </Box>
  );
};