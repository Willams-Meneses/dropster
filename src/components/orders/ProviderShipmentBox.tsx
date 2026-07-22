
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { colors } from '@/theme/palette';
import { SHIPMENT_STATUS_CONFIG } from '@/config/order-status.config';
import type { SubOrder } from '@/types/order.type';
import { ChipCustom } from '../ui/ChipCustom';

interface ProviderShipmentBoxProps {
  subOrder: SubOrder;
}

const PLACEHOLDER_IMG = 'https://via.placeholder.com/56x56.png?text=Prod';

export const ProviderShipmentBox: React.FC<ProviderShipmentBoxProps> = ({ subOrder }) => {
  const shipmentConfig = SHIPMENT_STATUS_CONFIG[subOrder.shipmentStatus];

  return (
    <Box
      sx={{
        border: `1px solid ${colors.neutral[300]}`,
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Header del proveedor */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderBottom: `1px solid ${colors.neutral[300]}`,
        }}
      >
        <Typography variant="subtitle1">Proveedor #{subOrder.providerId}</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body1">
            Costo de envío: $ {Number(subOrder.shippingCost).toLocaleString('es-AR')}
          </Typography>
          <Box sx={{ width: '1px', height: 16, backgroundColor: colors.neutral[300] }} />
          <ChipCustom
            label={shipmentConfig.label}
            backgroundColor={shipmentConfig.backgroundColor}
            textColor={shipmentConfig.textColor}
            size="medium"
          />
          {/* Sin lógica de tracking todavía: botón inerte */}
          <IconButton size="small" disabled>
            <LocalShippingOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Items */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {subOrder.items.map((item, idx) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 2,
              py: 1.5,
              borderBottom:
                idx < subOrder.items.length - 1 ? `1px solid ${colors.neutral[300]}` : 'none',
            }}
          >
            <Box
              component="img"
              src={item.imageUrl || PLACEHOLDER_IMG}
              alt={item.name}
              sx={{ width: 56, height: 56, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }}
            />

            <Box sx={{ flex: '1 1 260px', minWidth: 0 }}>
              <Typography variant="h6" sx={{ color: colors.brand.orange }} noWrap>
                {item.name}
              </Typography>
              {!!item.attributes?.length && (
                <Typography variant="caption" component="div">
                  {`Cantidad: ${item.quantity}, ${item.attributes.join(', ')}`}
                </Typography>
              )}
            </Box>

            <Box sx={{ flex: '0 0 auto', px: 2, borderLeft: `1px solid ${colors.neutral[300]}` }}>
              <Typography variant="caption" component="div">
                SKU: {item.sku ?? '-'}
              </Typography>
            </Box>

            <Box sx={{ flex: '0 0 auto', px: 2, borderLeft: `1px solid ${colors.neutral[300]}` }}>
              <Typography variant="body1" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                Productos: ${' '}
                {(Number(item.unitPrice) * item.quantity).toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                })}
              </Typography>
            </Box>

            <IconButton size="small">
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};