import { colors } from '@/theme/palette';
import type { StatusChipConfig } from '@/components/ui/data-table/StatusChip';
import type { OrderStatus, ShipmentStatus } from '@/types/order.type';

export const ORDER_STATUS_CONFIG: Record<OrderStatus, StatusChipConfig> = {
  pending_payment: {
    label: 'Pendiente de pago',
    backgroundColor: colors.status.warning,
    textColor: colors.white,
  },
  in_process: {
    label: 'En proceso',
    backgroundColor: '#FDE68A',
    textColor: '#92400E',
  },
  delivered: {
    label: 'Entregado',
    backgroundColor: colors.green.main,
    textColor: colors.white,
  },
  cancelled: {
    label: 'Cancelado',
    backgroundColor: colors.neutral[400],
    textColor: colors.white,
  },
  not_delivered: {
    label: 'No entregado',
    backgroundColor: colors.status.error,
    textColor: colors.white,
  },
};

export const SHIPMENT_STATUS_CONFIG: Record<ShipmentStatus, StatusChipConfig> = {
  in_transit: { label: 'En transito', backgroundColor: '#E0F2FE', textColor: '#0369A1' },
  delivered: { label: 'Entregado', backgroundColor: '#DCFCE7', textColor: colors.green.main },
  pending: { label: 'No despachado aún', backgroundColor: colors.neutral[300], textColor: colors.content.body },
  cancelled: { label: 'Cancelado', backgroundColor: colors.neutral[400], textColor: colors.white },
};