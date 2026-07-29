import type {
  ApiOrder,
  ApiOrderItem,
  ApiSubOrder,
  ApiSubOrderStatus,
  Order,
  OrderItem,
  OrderStatus,
  ShipmentStatus,
  SubOrder,
} from '@/types/order.type';

const mapOrderStatus = (status: ApiOrder['status']): OrderStatus =>
  status === 'paid' ? 'in_process' : status;

const SUB_ORDER_TO_SHIPMENT: Record<ApiSubOrderStatus, ShipmentStatus> = {
  pending_payment: 'pending',
  paid: 'pending',
  shipped: 'in_transit',
  received: 'delivered',
  completed: 'delivered',
  return_requested: 'in_transit',
  returned: 'cancelled',
  cancelled: 'cancelled',
};

const mapItem = (item: ApiOrderItem): OrderItem => ({
  id: item.id,
  name: item.variant.product?.name ?? 'Producto',
  imageUrl: item.variant.images?.[0]?.url ?? item.variant.product?.images?.[0]?.url,
  sku: item.variant.sku,
  quantity: item.quantity,
  unitPrice: item.unitPrice,
  attributes: item.variant.values,
});

const mapSubOrder = (subOrder: ApiSubOrder): SubOrder => ({
  id: subOrder.id,
  providerId: subOrder.providerId ?? '-',
  shippingCost: subOrder.shippingCost,
  shipmentStatus: SUB_ORDER_TO_SHIPMENT[subOrder.status],
  // Mock de URL de OCA si existe tracking
  trackingUrl: subOrder.tracking ? `https://www.oca.com.ar/DoorToDoor/Tracking/?number=${subOrder.tracking}` : undefined,
  items: (subOrder.items ?? []).map(mapItem),
});

export const mapApiOrderToOrder = (apiOrder: ApiOrder): Order => ({
  id: apiOrder.id,
  orderNumber: apiOrder.id.slice(0, 8),
  createdAt: apiOrder.createdAt,
  storeName: apiOrder.customerName, 
  customerName: apiOrder.customerName,
  customerEmail: apiOrder.customerEmail,
  customerAddress: apiOrder.customerAddress,
  customerCp: apiOrder.customerCp,
  customerLocalidad: apiOrder.customerLocalidad,
  customerProvincia: apiOrder.customerProvincia,
  status: mapOrderStatus(apiOrder.status),
  total: apiOrder.total,
  subOrders: apiOrder.subOrders.map(mapSubOrder),
});

export const mapApiOrdersToOrders = (apiOrders: ApiOrder[]): Order[] =>
  apiOrders.map(mapApiOrderToOrder);