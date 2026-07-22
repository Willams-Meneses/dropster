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

  const [step, setStep] = useState<CartStep>('cart');
  const [orderNumber, setOrderNumber] = useState<string>('');

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: emptyFormValues,
  });

  const postalCode = watch('postalCode');

  const handleGoToCheckout = () => {
    setOrderNumber(String(Math.floor(10000000 + Math.random() * 90000000)));
    setStep('checkout');
  };

  const handleBackToCart = () => setStep('cart');

  const handleCreateOrder = handleSubmit(async (values) => {
    await createOrder(values);
  });

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

            <Box sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
              <Button
                variant="contained"
                onClick={handleCreateOrder}
                disabled={!canCreateOrder}
              >
                {isLoading ? 'Creando pedido...' : 'Crear pedido'}
              </Button>
            </Box >
          )
        }
      >
        {
          isLoading ? (
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
            // Paso 2: formulario de envío a la izquierda, productos + resumen a la derecha.
            // El container ocupa el 100% del alto disponible del drawer para que
            // "Costo de envío" / "Total" queden siempre pegados abajo, sin scrollear.
            <Grid container spacing={4} sx={{ height: '100%' }}>
              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ height: '100%', minHeight: 0, overflowY: 'auto' }}
              >
                <CheckoutForm control={control} errors={errors} />
              </Grid>

              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' }}
              >
                <Typography variant="h3" sx={{ mb: 2, flexShrink: 0 }}>Productos</Typography>

                {/* Solo esta zona scrollea cuando hay muchos productos */}
                <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', pr: 0.5 }}>
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

                {/* Pegado abajo, siempre visible */}
                <Box sx={{ flexShrink: 0 }}>
                  <Divider sx={{ my: 2 }} />
                  <CartSummary
                    totalPrice={totalPrice}
                    items={items}
                    postalCode={postalCode}
                    isFormValid={isValid}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
      </GenericDrawer >

      {/* Modal de éxito */}
      < SuccessModal open={success} onClose={handleSuccessClose} />
    </>
  );
};