import React from 'react';
import { Box, Typography } from '@mui/material';
import { colors } from '@/theme/palette';

export interface TabItem {
  value: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface StatusTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const StatusTabs: React.FC<StatusTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        borderBottom: `1px solid ${colors.neutral[300]}`,
        mb: 2,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === activeTab;
        const label = tab.count !== undefined ? `${tab.label} (${tab.count})` : tab.label;

        return (
          <Box
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.75,
              pb: 1.25,
              cursor: 'pointer',
              borderBottom: isActive ? `2px solid ${colors.brand.orange}` : '2px solid transparent',
              mb: '-1px',
              userSelect: 'none',
            }}
          >
            <Typography
              variant="button"
              sx={{
                color: isActive ? colors.brand.orange : colors.content.body,
                fontWeight: isActive ? 600 : 400,
                transition: 'color 0.15s',
              }}
            >
              {label}
            </Typography>
            {tab.icon && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>{tab.icon}</Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};