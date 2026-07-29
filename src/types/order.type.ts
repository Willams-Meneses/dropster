
// ─── API (shape real del backend) ──────────────────────────────────────────

export interface ApiImage {
  url: string;
  publicId: string;
}

export interface ApiVariantProduct {
  id: string;
  name: string;
  images: ApiImage[];
}

export interface ApiOrderItemVariant {
  id: string;
  values: string[];
  sku: string;
  images: ApiImage[];
  product: ApiVariantProduct;
}

export interface ApiOrderItem {
  id: string;
  quantity: number;
  unitPrice: string;
  createdAt: string;
  variant: ApiOrderItemVariant;
}

export interface ApiSubOrder {
  id: string;
  status: ApiSubOrderStatus;
  shippingCost: string;
  tracking?: string | null;
  createdAt: string;
  providerId?: string;
  providerName?: string;
  items: ApiOrderItem[];
}

export type ApiOrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'cancelled'
  | 'in_process'
  | 'delivered'
  | 'not_delivered';

export type ApiSubOrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'shipped'
  | 'received'
  | 'completed'
  | 'return_requested'
  | 'returned'
  | 'cancelled';

export interface ApiOrderItem {
  id: string;
  variantId: string;
  quantity: number;
  unitPrice: string;
  name?: string;
  sku?: string;
  imageUrl?: string;
  variantName?: string;
}

export interface ApiOrder {
  id: string;
  total: string;
  status: ApiOrderStatus;
  channel: string;
  expiresAt: string;
  customerName: string;
  customerEmail: string;
  customerAddress?: string;
  customerCp?: string;
  customerLocalidad?: string;
  customerProvincia?: string;
  createdAt: string;
  subOrders: ApiSubOrder[];
}

export interface ApiOrdersResponse {
  data: ApiOrder[];
  total: number;
}

export interface CreateOrderPayload {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: { variantId: string; quantity: number }[];
}

// ─── UI (shape que espera OrderCard / ProviderShipmentBox) ─────────────────

export type OrderStatus =
  | 'pending_payment'
  | 'in_process'
  | 'delivered'
  | 'cancelled'
  | 'not_delivered';

export type ShipmentStatus = 'in_transit' | 'delivered' | 'pending' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  imageUrl?: string;
  sku?: string;
  quantity: number;
  unitPrice: number | string;
  /** Ej: ['Color: Aluminio', 'Modelo: Modelo 1', 'Talle: Talle M'] */
  attributes?: string[];
}

export interface SubOrder {
  id: string;
  providerId: string;
  shippingCost: number | string;
  shipmentStatus: ShipmentStatus;
  trackingUrl?: string;
  items: OrderItem[];
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  storeName: string;
  storeLogoUrl?: string;
  status: OrderStatus;
  total: number | string;
  subOrders: SubOrder[];
  customerName: string;
  customerEmail: string;
  customerAddress?: string;
  customerCp?: string;
  customerLocalidad?: string;
  customerProvincia?: string;
}