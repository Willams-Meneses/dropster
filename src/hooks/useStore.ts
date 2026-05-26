
import { useEffect, useState } from 'react';
import { storeService } from '@/services/store.service';
import type { DropshipperStore } from '@/types/store.type';

interface UseStoreResult {
  store: DropshipperStore | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useStore = (): UseStoreResult => {
  const [store, setStore] = useState<DropshipperStore | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchStore = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await storeService.getMyStore();
        if (!cancelled) setStore(data);
      } catch (err: unknown) {
        if (!cancelled) {
          // 404 = sin tienda conectada, no es un error de UI
          const status = (err as { response?: { status?: number } })?.response?.status;
          if (status === 404) {
            setStore(null);
          } else {
            setError('No se pudo cargar la tienda. Intentá de nuevo.');
          }
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void fetchStore();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  return { store, isLoading, error, refetch: () => setTick((t) => t + 1) };
};