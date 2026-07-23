import type { ApiImage, ApiVariantProduct } from './order.type';

// ─── API (shape real del backend para Sales) ──────────────────────────────

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
  createdAt: string;
}

export type ApiSaleStatus = 'paid' | 'shipped' | 'delivered' | 'returned' | 'not_delivered';

export interface ApiSale {
  id: string;
  status: ApiSaleStatus;
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

// ─── UI (shape que espera SaleCard / SaleItemsBox) ────────────────────────

export type SaleStatus =
  | 'ready_to_dispatch'
  | 'in_process'
  | 'delivered'
  | 'returned'
  | 'not_delivered';

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
  status: SaleStatus;
  total: number;
  shippingCost: number | string;
  trackingUrl?: string | null;
  items: SaleItem[];
}