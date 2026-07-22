import api from '@/lib/axios';
import type { ApiOrder, ApiOrdersResponse, CreateOrderPayload } from '@/types/order.type';

export const orderService = {
  createOrder: async (payload: CreateOrderPayload): Promise<ApiOrder> => {
    const { data } = await api.post<ApiOrder>('/orders', payload);
    return data;
  },

  getOrders: async (page = 1, limit = 20): Promise<ApiOrdersResponse> => {
    const { data } = await api.get<ApiOrdersResponse>(`/orders?page=${page}&limit=${limit}`);
    return data;
  },

  getOrderById: async (id: string): Promise<ApiOrder> => {
    const { data } = await api.get<ApiOrder>(`/orders/${id}`);
    return data;
  },

  initiatePayment: async (id: string): Promise<{ checkoutUrl: string; externalId: string }> => {
    const { data } = await api.post<{ checkoutUrl: string; externalId: string }>(`/orders/${id}/pay`);
    return data;
  },
};