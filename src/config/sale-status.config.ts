import { colors } from '@/theme/palette';
import type { StatusChipConfig } from '@/components/ui/data-table/StatusChip';
import type { SaleStatus } from '@/types/sale.type';

export const SALE_STATUS_CONFIG: Record<SaleStatus, StatusChipConfig> = {
  ready_to_dispatch: { label: 'Listo para despachar', backgroundColor: '#FDE68A', textColor: '#92400E' },
  in_process: { label: 'En proceso', backgroundColor: '#E0F2FE', textColor: '#0369A1' },
  delivered: { label: 'Entregado', backgroundColor: colors.green.main, textColor: colors.white },
  return_requested: { label: 'Devolución solicitada', backgroundColor: colors.status.warning, textColor: colors.white },
  returned: { label: 'Devuelto', backgroundColor: colors.neutral[400], textColor: colors.white },
  cancelled: { label: 'Cancelado', backgroundColor: colors.status.error, textColor: colors.white },
};

export const SALE_STATUS_MESSAGES: Record<SaleStatus, string> = {
  ready_to_dispatch: 'Tenés que darle el paquete a tu conductor mañana.',
  in_process: 'El pedido está en camino al cliente.',
  delivered: 'El pedido fue entregado exitosamente.',
  return_requested: 'El dropshipper solicitó una devolución.',
  returned: 'El pedido fue devuelto.',
  cancelled: 'Esta venta fue cancelada.',
};