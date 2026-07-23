
import { colors } from '@/theme/palette';
import type { StatusChipConfig } from '@/components/ui/data-table/StatusChip';
import type { SaleStatus } from '@/types/sale.type';

export const SALE_STATUS_CONFIG: Record<SaleStatus, StatusChipConfig> = {
  ready_to_dispatch: {
    label: 'Listo para despachar',
    backgroundColor: colors.neutral[300],
    textColor: colors.content.strong,
  },
  in_process: {
    label: 'En proceso',
    backgroundColor: '#E0F2FE',
    textColor: '#0369A1',
  },
  delivered: {
    label: 'Entregado',
    backgroundColor: colors.green.main,
    textColor: colors.white,
  },
  returned: {
    label: 'Devuelto',
    backgroundColor: colors.status.error,
    textColor: colors.white,
  },
  not_delivered: {
    label: 'No entregado',
    backgroundColor: colors.neutral[400],
    textColor: colors.white,
  },
};