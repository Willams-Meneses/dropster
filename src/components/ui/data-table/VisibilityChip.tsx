import React from 'react';
import { colors } from '@/theme/palette';
import { ChipCustom } from '../ChipCustom';

interface VisibilityChipProps {
  visible: boolean;
}

/**
 * Chip that shows "Visible" / "Oculto" state for a variant or product.
 */
export const VisibilityChip: React.FC<VisibilityChipProps> = ({ visible }) => (
  <ChipCustom
    label={visible ? 'Visible' : 'Oculto'}
    border
    borderColor={visible ? colors.neutral[300] : colors.status.warning}
    textColor={visible ? colors.content.body : colors.status.warning}
    size="medium"
  />
);