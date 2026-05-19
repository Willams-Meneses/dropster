import api from '@/lib/axios';
import type { ApiProduct } from '@/types/product.type';

export const productsService = {
  getCatalog: async (): Promise<ApiProduct[]> => {
    const { data } = await api.get<ApiProduct[]>('/products/catalog');
    return data;
  },
};