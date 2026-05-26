// ─── API response types ───────────────────────────────────────────────────────

export interface DropshipperStore {
  id: string;
  dropshipperId: string;
  tiendanubeStoreId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Lo que devuelve GET /store/tiendanube/callback (mismo shape que connectStore)
export type ConnectedStore = DropshipperStore;