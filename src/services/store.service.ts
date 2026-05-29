
import api from '@/lib/axios';
import type { StoreProductItem } from '@/types/store-product.type';
import type { ConnectedStore, DropshipperStore } from '@/types/store.type';

export const storeService = {
  // El code viene de los query params que manda TN al callback.
  // El backend hace el exchange y devuelve la store ya conectada.
  exchangeAndConnect: async (code: string): Promise<ConnectedStore> => {
    const { data } = await api.get<ConnectedStore>('/store/tiendanube/callback', {
      params: { code },
    });
    return data;
  },

  getMyStore: async (): Promise<DropshipperStore> => {
    const { data } = await api.get<DropshipperStore>('/store');
    return data;
  },

  addProductToStore: async (productId: string): Promise<void> => {
    await api.post('/store/products', { productId });
  },

  removeProductFromStore: async (tiendanubeProductId: string): Promise<void> => {
    await api.delete(`/store/products/${tiendanubeProductId}`);
  },

  getStoreProducts: async (): Promise<StoreProductItem[]> => {
    const { data } = await api.get<StoreProductItem[]>('/store/products');
    return data;
  },

  updateSellPrice: async (dropshipperVariantId: string, sellPrice: string): Promise<void> => {
    await api.patch(`/store/variants/${dropshipperVariantId}/sell-price`, { sellPrice });
  },
};