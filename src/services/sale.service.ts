import api from '@/lib/axios';
import type { ApiSale, ApiSalesResponse } from '@/types/sale.type';

export const saleService = {
  getSales: async (page = 1, limit = 20): Promise<ApiSalesResponse> => {
    const { data } = await api.get<ApiSalesResponse>(`/sales?page=${page}&limit=${limit}`);
    return data;
  },

  getSaleById: async (id: string): Promise<ApiSale> => {
    const { data } = await api.get<ApiSale>(`/sales/${id}`);
    return data;
  },

  dispatchSale: async (id: string): Promise<{ trackingId: string; labelBase64: string }> => {
    const { data } = await api.post<{ trackingId: string; labelBase64: string }>(`/sales/${id}/dispatch`);
    return data;
  },
};