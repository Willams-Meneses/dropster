import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { colors } from '@/theme/palette';
import { ChipCustom } from '@/components/ui/ChipCustom';
import { SHIPMENT_STATUS_CONFIG } from '@/config/order-status.config';
import type { SubOrder, OrderItem } from '@/types/order.type';

const PLACEHOLDER_IMG = 'https://via.placeholder.com/72x72.png?text=Prod';

const formatMoney = (val: number | string) =>
  `$ ${Number(val).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;

// ─── Item row ─────────────────────────────────────────────────────────────────

interface DetailItemRowProps {
  item: OrderItem;
  isLast: boolean;
}

const DetailItemRow: React.FC<DetailItemRowProps> = ({ item, isLast }) => (
  <>
    {/* Imagen + nombre + atributos + botón */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        px: 3,
        py: 2,
      }}
    >
      <Box
        component="img"
        src={item.imageUrl || PLACEHOLDER_IMG}
        alt={item.name}
        sx={{
          width: 72,
          height: 72,
          borderRadius: 2,
          objectFit: 'contain',
          bgcolor: colors.neutral[100],
          flexShrink: 0,
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="h5" sx={{ color: colors.brand.orange }}>
          {item.name}
        </Typography>
        {!!item.attributes?.length && (
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.25 }}>
            {`Cantidad: ${item.quantity}, ${item.attributes.join(', ')}`}
          </Typography>
        )}
      </Box>

      <IconButton
        size="medium"
        sx={{
          border: `1px solid ${colors.neutral[300]}`,
          borderRadius: '50%',
          flexShrink: 0,
        }}
      >
        <MoreHorizIcon fontSize="small" />
      </IconButton>
    </Box>

    {/* SKU + precio */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        px: 3,
        pb: 2,
      }}
    >
      <Typography variant="body1">
        SKU:{' '}
        <Box component="span" sx={{ fontWeight: 700 }}>
          {item.sku ?? '-'}
        </Box>
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Productos:{' '}
        <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
          {formatMoney(Number(item.unitPrice) * item.quantity)}
        </Box>
      </Typography>
    </Box>

    {!isLast && <Divider />}
  </>
);

// ─── OrderDetailProviderGroup ─────────────────────────────────────────────────

interface OrderDetailProviderGroupProps {
  subOrder: SubOrder;
}

export const OrderDetailProviderGroup: React.FC<OrderDetailProviderGroupProps> = ({ subOrder }) => {
  const shipmentConfig = SHIPMENT_STATUS_CONFIG[subOrder.shipmentStatus];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: '0px 2px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Header proveedor */}
      <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
        <Typography variant="h5">
          Proveedor #{subOrder.providerId.slice(0, 10)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          pb: 2,
        }}
      >
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Costo de envío: {formatMoney(subOrder.shippingCost)}
        </Typography>
        <ChipCustom
          label={shipmentConfig.label}
          backgroundColor={shipmentConfig.backgroundColor}
          textColor={shipmentConfig.textColor}
          size="medium"
        />
      </Box>

      <Divider />

      {/* Items */}
      {subOrder.items.map((item, idx) => (
        <DetailItemRow
          key={item.id}
          item={item}
          isLast={idx === subOrder.items.length - 1}
        />
      ))}
    </Box>
  );
};