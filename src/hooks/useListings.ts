import { useState, useEffect } from 'react';
import { listingsService } from '@/services/listings.service';
import { mapApiProductsToListings } from '@/utils/mappers/listing.mapper';
import type { Listing } from '@/types/listings.type';

interface UseListingsResult {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useListings = (): UseListingsResult => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchListings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiProducts = await listingsService.getMyProducts();
        if (!cancelled) {
          setListings(mapApiProductsToListings(apiProducts));
        }
      } catch {
        if (!cancelled) {
          setError('No se pudieron cargar las publicaciones. Intentá de nuevo.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchListings();

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const refetch = () => setTick((t) => t + 1);

  return { listings, isLoading, error, refetch };
};