import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { ChipCustom } from '@/components/ui/ChipCustom';
import { SHIPMENT_STATUS_CONFIG } from '@/config/order-status.config';
import type { SubOrder } from '@/types/order.type';
import { DetailItemRow } from '@/components/ui/detail/DetailItemRow';
import { formatPrice } from '@/utils/formatPrice';

interface OrderDetailProviderGroupProps {
  subOrder: SubOrder;
}

export const OrderDetailProviderGroup: React.FC<OrderDetailProviderGroupProps> = ({ subOrder }) => {
  const shipmentConfig = SHIPMENT_STATUS_CONFIG[subOrder.shipmentStatus];

  return (
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: '0px 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
        <Typography variant="h5">Proveedor #{subOrder.providerId.slice(0, 10)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pb: 2 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Costo de envío: {formatPrice(subOrder.shippingCost)}
        </Typography>
        <ChipCustom label={shipmentConfig.label} backgroundColor={shipmentConfig.backgroundColor} textColor={shipmentConfig.textColor} size="medium" />
      </Box>

      <Divider />

      {subOrder.items.map((item, idx) => (
        <DetailItemRow key={item.id} item={item} isLast={idx === subOrder.items.length - 1} />
      ))}
    </Box>
  );
};