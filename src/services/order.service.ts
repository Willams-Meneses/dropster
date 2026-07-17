import api from '@/lib/axios';

export interface CreateOrderPayload {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: { variantId: string; quantity: number }[];
}

export const orderService = {
  createOrder: async (payload: CreateOrderPayload) => {
    const { data } = await api.post('/orders', payload);
    return data;
  },
};