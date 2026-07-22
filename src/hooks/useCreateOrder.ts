import { useState } from 'react';
import { orderService } from '@/services/order.service';
import { useCartStore } from '@/store/cartStore';
import type { CheckoutFormValues } from '@/schemas/checkout.schema';

export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { items, clearCart } = useCartStore();

  const createOrder = async (formData: CheckoutFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Construimos el payload mapeando los items del carrito
      const payload = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: 'dropshipper1@test.com', // Se puede obtener de un store de usuario si existe
        customerAddress: `${formData.street} ${formData.height}, ${formData.city}, ${formData.province}, ${formData.country}`,
        customerCp: formData.postalCode,
        items: items.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
      };

      await orderService.createOrder(payload);
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el pedido');
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading, error, success, setSuccess };
};