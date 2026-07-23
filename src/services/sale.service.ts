import api from '@/lib/axios';
import type { ApiSalesResponse } from '@/types/sale.type';

export const saleService = {
  getSales: async (page = 1, limit = 20): Promise<ApiSalesResponse> => {
    const { data } = await api.get<ApiSalesResponse>(`/sales?page=${page}&limit=${limit}`);
    return data;
  },
};