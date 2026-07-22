import { useState, useEffect } from 'react';
import { orderService } from '@/services/order.service';
import { mapApiOrdersToOrders } from '@/utils/mappers/order.mapper';
import type { Order } from '@/types/order.type';

interface UseOrdersResult {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useOrders = (): UseOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await orderService.getOrders();
        if (!cancelled) {
          setOrders(mapApiOrdersToOrders(response.data));
        }
      } catch {
        if (!cancelled) {
          setError('No se pudieron cargar las órdenes. Intentá de nuevo.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchOrders();

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const refetch = () => setTick((t) => t + 1);

  return { orders, isLoading, error, refetch };
};