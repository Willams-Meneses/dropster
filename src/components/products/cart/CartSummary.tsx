import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import type { CartItem } from '@/store/cartStore';
import { shippingService } from '@/services/shipping.service';
import { formatPrice } from '@/utils/formatPrice';

interface CartSummaryProps {
  totalPrice: number;
  items: CartItem[];
  postalCode: string;
  isFormValid: boolean;
}

interface ShippingQuote {
  cost: number;
  postalCode: string;
  itemsKey: string;
}

// Clave estable para comparar si el set de items cambió (id + cantidad)
const getItemsKey = (items: CartItem[]): string =>
  items.map((item) => `${item.variantId}:${item.quantity}`).join('|');

export const CartSummary = ({ totalPrice, items, postalCode, isFormValid }: CartSummaryProps) => {
  const [quote, setQuote] = useState<ShippingQuote | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const itemsKey = getItemsKey(items);

  const isQuoteStale = quote !== null && (quote.postalCode !== postalCode || quote.itemsKey !== itemsKey);
  const shippingCost = quote && !isQuoteStale ? quote.cost : null;

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const payload = {
        cp: postalCode,
        items: items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
      };
      const response = await shippingService.quoteShipping(payload);
      setQuote({ cost: Number(response.shippingCost), postalCode, itemsKey });
    } catch (error) {
      console.error('Error al calcular envío:', error);
      setQuote(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const canCalculate = isFormValid && !isCalculating && items.length > 0;
  const finalTotal = totalPrice + (shippingCost ?? 0);

  return (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h4">Costo de envío</Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleCalculate}
          disabled={!canCalculate}
          sx={{
            px:1.5,
            py: 0.5
          }}
        >
          {isCalculating ? 'Calculando...' : 'Calcular costo'}
        </Button>
        <Typography variant="h5" sx={{ color: 'text.primary' }}>
          {formatPrice(shippingCost ?? 0)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          pt: 1,
          mt: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
          <Typography variant="h4" color="text.secondary">
            Total:
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.primary' }}>
            {formatPrice(finalTotal)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};