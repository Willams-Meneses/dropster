import { useState, useEffect } from 'react';
import { storeService } from '@/services/store.service';
import { mapStoreProductsToStoreListings } from '@/utils/mappers/store-listing.mapper';
import type { StoreListing } from '@/types/store-listing.type';

interface UseStoreProductsResult {
  storeListings: StoreListing[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useStoreProducts = (): UseStoreProductsResult => {
  const [storeListings, setStoreListings] = useState<StoreListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await storeService.getStoreProducts();
        if (!cancelled) {
          setStoreListings(mapStoreProductsToStoreListings(data));
        }
      } catch {
        if (!cancelled) {
          setError('No se pudieron cargar los productos de tu tienda. Intentá de nuevo.');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  return {
    storeListings,
    isLoading,
    error,
    refetch: () => setTick((t) => t + 1),
  };
};