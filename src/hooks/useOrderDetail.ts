import { useState, useEffect } from 'react';
import { orderService } from '@/services/order.service';
import { mapApiOrderToOrder } from '@/utils/mappers/order.mapper';
import type { Order } from '@/types/order.type';

interface UseOrderDetailResult {
  order: Order | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useOrderDetail = (id: string): UseOrderDetailResult => {
  const [order, setOrder] = useState<Order | null>(null);
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
        const apiOrder = await orderService.getOrderById(id);
        if (!cancelled) setOrder(mapApiOrderToOrder(apiOrder));
      } catch {
        if (!cancelled) setError('No se pudo cargar el pedido. Intentá de nuevo.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void fetch();
    return () => { cancelled = true; };
  }, [id, tick]);

  return { order, isLoading, error, refetch: () => setTick((t) => t + 1) };
};