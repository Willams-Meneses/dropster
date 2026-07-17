import { useState } from 'react';
import { Box, Typography, Button, Divider, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GenericDrawer from '@/components/ui/drawer/GenericDrawer';
import { useCartStore, useCartTotalItems, useCartTotalPrice } from '@/store/cartStore';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { checkoutSchema, type CheckoutFormValues } from '@/schemas/checkout.schema';
import { CartItemCard } from './CartItemCard';
import { CheckoutForm } from './CheckoutForm';
import { CartSummary } from './CartSummary';
import { SuccessModal } from './SuccessModal';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

type CartStep = 'cart' | 'checkout';

const SHIPPING_COST = 565.0;

const emptyFormValues: CheckoutFormValues = {
  firstName: '', lastName: '', dni: '', phone: '',
  street: '', height: '',
  province: '', city: '', postalCode: '', country: '',
};

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem } = useCartStore();
  const totalItems = useCartTotalItems();
  const totalPrice = useCartTotalPrice();
  const { createOrder, isLoading, success, setSuccess } = useCreateOrder();

  // Paso actual del flujo: 1) carrito, 2) checkout (form + confirmación de pedido)
  const [step, setStep] = useState<CartStep>('cart');
  // Número de pedido "provisorio" que se muestra en el header del paso 2,
  // se genera una sola vez al entrar a checkout.
  const [orderNumber, setOrderNumber] = useState<string>('');

  // Form de checkout validado con Zod. mode: 'onChange' para que isValid
  // se recalcule mientras el usuario completa los campos (así el botón
  // "Crear pedido" se habilita apenas el form queda completo y válido).
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: emptyFormValues,
  });

  const handleGoToCheckout = () => {
    setOrderNumber(String(Math.floor(10000000 + Math.random() * 90000000)));
    setStep('checkout');
  };

  const handleBackToCart = () => setStep('cart');

  const handleCreateOrder = handleSubmit(async (values) => {
    await createOrder(values);
  });

  // Al cerrar el drawer (por X, por click afuera, o tras éxito) volvemos siempre
  // al primer paso y reseteamos el form, para que la próxima vez que se abra
  // no arranque en checkout ni con datos de un pedido anterior.
  const handleClose = () => {
    setStep('cart');
    reset(emptyFormValues);
    onClose();
  };

  const handleSuccessClose = () => {
    setSuccess(false);
    setStep('cart');
    reset(emptyFormValues);
    onClose();
  };

  // Botón "Crear pedido" habilitado solo si el form es válido Y hay al menos
  // un producto en el carrito.
  const canCreateOrder = isValid && items.length > 0 && !isLoading;

  return (
    <>
      <GenericDrawer
        open={open}
        onClose={handleClose}
        width={step === 'cart' ? 600 : 960}
        title={
          step === 'cart' ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h2">Carrito</Typography>
              <Box sx={{ bgcolor: 'error.main', color: 'white', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: 'white' }}>{totalItems}</Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={handleBackToCart} size="small">
                <ArrowBackIcon fontSize="small" />
              </IconButton>
              <Typography variant="h2">Pedido #{orderNumber}</Typography>
            </Box>
          )
        }
        footer={
          step === 'cart' ? (
            items.length > 0 ? (
              <Button
                variant="contained"
                fullWidth
                onClick={handleGoToCheckout}
                sx={{ py: 1.5 }}
              >
                Continuar
              </Button>
            ) : null
          ) : (
            <Button
              variant="contained"
              fullWidth
              onClick={handleCreateOrder}
              disabled={!canCreateOrder}
              sx={{ py: 1.5 }}
            >
              {isLoading ? 'Creando pedido...' : 'Crear pedido'}
            </Button>
          )
        }
      >
        {isLoading ? (
          <LoadingScreen message="Procesando pedido..." fullScreen={false} />
        ) : items.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <Typography variant="body1" color="text.secondary">Tu carrito está vacío.</Typography>
          </Box>
        ) : step === 'cart' ? (
          // Paso 1: solo la lista de productos del carrito
          <Box>
            {items.map((item) => (
              <Box key={item.variantId} sx={{ mb: 2 }}>
                <CartItemCard
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              </Box>
            ))}
          </Box>
        ) : (
          // Paso 2: formulario de envío a la izquierda, productos + resumen a la derecha
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CheckoutForm control={control} errors={errors} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" sx={{ mb: 2 }}>Productos</Typography>
              <Box>
                {items.map((item) => (
                  <Box key={item.variantId} sx={{ mb: 2 }}>
                    <CartItemCard
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <CartSummary totalPrice={totalPrice} shippingCost={SHIPPING_COST} />
            </Grid>
          </Grid>
        )}
      </GenericDrawer>

      {/* Modal de éxito */}
      <SuccessModal open={success} onClose={handleSuccessClose} />
    </>
  );
};