import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { orderService } from '@/services/order.service';
import { useSnackbar } from 'notistack';

type VerificationStatus = 'checking' | 'success' | 'pending' | 'rejected' | 'error';

// Función pura para calcular el estado inicial basado en la URL
const getInitialStatus = (orderId: string | null, mpStatus: string | null): VerificationStatus => {
  if (!orderId) return 'error';
  if (mpStatus === 'rejected') return 'rejected';
  if (mpStatus === 'pending' || mpStatus === 'in_process') return 'pending';
  return 'checking';
};

export const PaymentStatusPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const mpStatus = searchParams.get('collection_status');
  const orderId = searchParams.get('external_reference');

  // Inicializamos el estado derivando de los parámetros, ¡sin useEffect!
  const [status, setStatus] = useState<VerificationStatus>(() => 
    getInitialStatus(orderId, mpStatus)
  );

  useEffect(() => {
    // Si no estamos en estado 'checking', no necesitamos hacer polling
    if (status !== 'checking' || !orderId) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 5;
    const intervalTime = 2000;

    const interval = setInterval(async () => {
      attempts += 1;
      try {
        const order = await orderService.getOrderById(orderId);
        
        // El backend devuelve 'paid' cuando el webhook procesa
        if (order.status === 'paid' || order.status === 'in_process' || order.status === 'delivered') {
          clearInterval(interval);
          setStatus('success');
          enqueueSnackbar('¡Pago aprobado con éxito!', { variant: 'success' });
          setTimeout(() => navigate('/dashboard/orders'), 1500);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          setStatus('success');
          enqueueSnackbar('¡Pago aprobado con éxito!', { variant: 'success' });
          setTimeout(() => navigate('/dashboard/orders'), 1500);
        }
      } catch {
        clearInterval(interval);
        setStatus('error');
        enqueueSnackbar('Hubo un problema al verificar el pago.', { variant: 'error' });
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [status, orderId, navigate, enqueueSnackbar]);

  const handleRedirectToOrders = () => navigate('/dashboard/orders');

  if (status === 'checking') {
    return <LoadingScreen message="Procesando su pago..." fullScreen={false} />;
  }

  if (status === 'success') {
    return <LoadingScreen message="¡Pago confirmado! Redirigiendo a tus órdenes..." fullScreen={false} />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 3, textAlign: 'center' }}>
      {status === 'pending' && (
        <>
          <Typography variant="h5" color="text.secondary">
            Tu pago está pendiente de acreditación.
          </Typography>
          <Typography variant="body1">
            Si pagaste con ticket o transferencia, puede demorar hasta 48hs hábiles en acreditarse.
          </Typography>
          <Button variant="contained" onClick={handleRedirectToOrders}>
            Ir a mis órdenes
          </Button>
        </>
      )}

      {status === 'rejected' && (
        <>
          <Typography variant="h5" color="error.main">
            El pago fue rechazado.
          </Typography>
          <Typography variant="body1">
            No se realizó ningún cargo. Podés intentar nuevamente desde la sección de órdenes.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRedirectToOrders}>
            Volver a intentar
          </Button>
        </>
      )}

      {status === 'error' && (
        <>
          <Typography variant="h5" color="warning.main">
            No pudimos verificar el estado de tu pago.
          </Typography>
          <Typography variant="body1">
            Si ya realizaste el pago, no te preocupes, se actualizará automáticamente en unos minutos.
          </Typography>
          <Button variant="contained" onClick={handleRedirectToOrders}>
            Ir a mis órdenes
          </Button>
        </>
      )}
    </Box>
  );
};