import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { storeService } from '@/services/store.service';

type PageState = 'loading' | 'error';

// Esta página vive en /dashboard/my-stores/callback
// Tiendanube redirige acá con ?code=xxx después de que el usuario autoriza
const TiendanubeCallbackPage = () => {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const calledRef = useRef(false); // evita doble llamada en StrictMode

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const code = searchParams.get('code');

    const connect = async () => {
      if (!code) {
        setPageState('error');
        return;
      }

      try {
        await storeService.exchangeAndConnect(code);
        navigate('/dashboard/my-stores', { replace: true });
      } catch {
        setPageState('error');
      }
    };

    void connect();
  }, [searchParams, navigate]);

  if (pageState === 'error') {
    return (
      <ErrorMessage
        message="No se pudo conectar la tienda. Intentá de nuevo."
        onRetry={() => navigate('/dashboard/my-stores', { replace: true })}
      />
    );
  }

  return <LoadingScreen message="Conectando tu tienda Tiendanube..." />;
};

export default TiendanubeCallbackPage;