import { Box, Typography } from '@mui/material';

interface CartSummaryProps {
  totalPrice: number;
  shippingCost: number;
}

export const CartSummary = ({ totalPrice, shippingCost }: CartSummaryProps) => {
  return (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Costo de envío</Typography>
        <Typography variant="body1">$ {shippingCost.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'divider', pt: 1, mt: 1 }}>
        <Typography variant="h5">Total</Typography>
        <Typography variant="h5" sx={{ color: 'text.primary' }}>
          $ {(totalPrice + shippingCost).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </Typography>
      </Box>
    </Box>
  );
};