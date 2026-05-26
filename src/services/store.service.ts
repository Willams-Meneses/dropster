
import api from '@/lib/axios';
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
};