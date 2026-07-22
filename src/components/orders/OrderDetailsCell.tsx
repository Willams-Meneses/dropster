import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import type { SubOrder } from '@/types/order.type';

interface OrderDetailsCellProps {
  subOrders: SubOrder[];
}

export const OrderDetailsCell: React.FC<OrderDetailsCellProps> = ({ subOrders }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {subOrders.map((subOrder) => {
        const productsTotal = subOrder.items?.reduce(
          (acc, item) => acc + Number(item.unitPrice) * item.quantity, 
          0
        ) ?? 0;

        return (
          <Box key={subOrder.id} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            
            {/* Info del Proveedor */}
            <Typography variant="caption" component="div" sx={{ fontWeight: 700, color: 'text.secondary' }}>
              Proveedor #{subOrder.providerId || '0987654322'}
            </Typography>

            {/* Productos */}
            {subOrder.items?.map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <Box
                  component="img"
                  src={item.imageUrl || "https://via.placeholder.com/48x48.png?text=Prod"}
                  alt={item.name || 'Producto'}
                  sx={{ width: 48, height: 48, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body1" component="div" noWrap sx={{ fontWeight: 500 }}>
                    {item.name || 'Cafetera italiana 6 pocillos'}
                  </Typography>
                  <Typography variant="caption" component="div" color="text.secondary">
                    {`Cantidad: ${item.quantity}, Color: Aluminio, Modelo: Modelo 1, Talle: Talle M`}
                  </Typography>
                  <Typography variant="caption" component="div" color="text.secondary">
                    SKU: {item.sku || '2142342332'}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                  $ {Number(item.unitPrice).toLocaleString('es-AR')}
                </Typography>
              </Box>
            ))}
            
            {/* Envío y Seguimiento */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5, pl: 7.5 /* Alinea con el texto del producto */ }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="body2" component="div" color="text.secondary">
                  Envío: $ {Number(subOrder.shippingCost).toLocaleString('es-AR')}
                </Typography>
                <Chip 
                  label="En transito" 
                  size="small" 
                  sx={{ backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 600 }} 
                />
              </Box>
              <Button 
                size="small" 
                startIcon={<LocalShippingIcon fontSize="small" />}
                sx={{ textTransform: 'none', color: 'text.primary' }}
              >
                Seguimiento
              </Button>
            </Box>

            {/* Total Productos */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
              <Typography variant="body2" component="div" sx={{ fontWeight: 600 }}>
                Productos: $ {productsTotal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};