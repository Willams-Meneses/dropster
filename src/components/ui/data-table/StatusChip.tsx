import React from 'react';
import { ChipCustom } from '../ChipCustom';

export interface StatusChipConfig {
  label: string;
  backgroundColor: string;
  textColor: string;
}

interface StatusChipProps {
  config: StatusChipConfig;
}

/**
 * Renders a filled status chip given a config object.
 *
 * Usage:
 *   const STATUS_CHIP: Record<MyStatus, StatusChipConfig> = { ... };
 *   <StatusChip config={STATUS_CHIP[row.status]} />
 */
export const StatusChip: React.FC<StatusChipProps> = ({ config }) => (
  <ChipCustom
    label={config.label}
    backgroundColor={config.backgroundColor}
    textColor={config.textColor}
    size="medium"
  />
);