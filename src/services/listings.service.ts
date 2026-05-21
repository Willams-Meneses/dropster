import api from '@/lib/axios';
import type { ApiProduct } from '@/types/product.type';

export const listingsService = {
  getMyProducts: async (): Promise<ApiProduct[]> => {
    const { data } = await api.get<ApiProduct[]>('/products/my-products');
    return data;
  },
};