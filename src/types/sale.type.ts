import type { ApiImage, ApiVariantProduct, ApiSubOrderStatus } from './order.type';

export interface ApiSaleItemVariant {
  id: string;
  values: string[];
  sku: string;
  weight?: string;
  images: ApiImage[];
  product: ApiVariantProduct;
}

export interface ApiSaleItem {
  id: string;
  quantity: number;
  unitPrice: string;
  variant: ApiSaleItemVariant;
}

export interface ApiSaleOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerCp?: string;
  customerLocalidad?: string;
  customerProvincia?: string;
  createdAt: string;
}

export interface ApiSale {
  id: string;
  status: ApiSubOrderStatus; // ✅ reutiliza el enum real del backend
  tracking: string | null;
  shippingCost: string;
  createdAt: string;
  order: ApiSaleOrder;
  items: ApiSaleItem[];
}

export interface ApiSalesResponse {
  data: ApiSale[];
  total: number;
}

// ─── UI ─────────────────────────────────────────────────────────────────

export type SaleStatus = 'ready_to_dispatch' | 'in_process' | 'delivered' | 'return_requested' | 'returned' | 'cancelled';

export interface SaleItem {
  id: string;
  name: string;
  imageUrl?: string;
  sku?: string;
  quantity: number;
  unitPrice: number | string;
  attributes?: string[];
}

export interface Sale {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerEmail?: string;
  customerAddress?: string;
  customerCp?: string;
  customerLocalidad?: string;
  customerProvincia?: string;
  status: SaleStatus;
  total: number;
  shippingCost: number | string;
  tracking?: string | null;
  trackingUrl?: string | null;
  items: SaleItem[];
}