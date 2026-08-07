import { useState, useEffect } from 'react';
import { saleService } from '@/services/sale.service';
import { mapApiSaleToSale } from '@/utils/mappers/sale.mapper';
import type { Sale } from '@/types/sale.type';

interface UseSaleDetailResult {
  sale: Sale | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useSaleDetail = (id: string): UseSaleDetailResult => {
  const [sale, setSale] = useState<Sale | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiSale = await saleService.getSaleById(id);
        if (!cancelled) setSale(mapApiSaleToSale(apiSale));
      } catch {
        if (!cancelled) setError('No se pudo cargar la venta. Intentá de nuevo.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void fetch();
    return () => { cancelled = true; };
  }, [id, tick]);

  return { sale, isLoading, error, refetch: () => setTick((t) => t + 1) };
};