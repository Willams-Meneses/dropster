import api from '@/lib/axios';
import type { ApiProduct, CreateProductPayload, CreateProductResponse } from '@/types/product.type';

export const listingsService = {
  getMyProducts: async (): Promise<ApiProduct[]> => {
    const { data } = await api.get<ApiProduct[]>('/products/my-products');
    return data;
  },

  create: async (payload: CreateProductPayload): Promise<CreateProductResponse> => {
    const { data } = await api.post<CreateProductResponse>('/products', payload);
    return data;
  },
  // create: async (payload: CreateProductPayload): Promise<boolean> => {
  //   console.log("mostrar el payload del producto a crear: ", payload);
  //   return true;
  // },
};