import { useState, useEffect } from 'react';
import { saleService } from '@/services/sale.service';
import { mapApiSalesToSales } from '@/utils/mappers/sale.mapper';
import type { Sale } from '@/types/sale.type';

interface UseSalesResult {
  sales: Sale[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSales = (): UseSalesResult => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchSales = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await saleService.getSales();
        if (!cancelled) {
          setSales(mapApiSalesToSales(response.data));
        }
      } catch {
        if (!cancelled) {
          setError('No se pudieron cargar las ventas. Intentá de nuevo.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchSales();

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const refetch = () => setTick((t) => t + 1);

  return { sales, isLoading, error, refetch };
};