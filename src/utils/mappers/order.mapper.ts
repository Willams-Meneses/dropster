// import type {
//   ApiOrder,
//   ApiSubOrder,
//   ApiSubOrderStatus,
//   Order,
//   OrderStatus,
//   ShipmentStatus,
//   SubOrder,
// } from '@/types/order.type';

// // El backend no tiene 'paid' como estado final visible en la UI de Pedidos:
// // se colapsa a 'in_process' salvo que decidan lo contrario.
// const mapOrderStatus = (status: ApiOrder['status']): OrderStatus =>
//   status === 'paid' ? 'in_process' : status;

// const SUB_ORDER_TO_SHIPMENT: Record<ApiSubOrderStatus, ShipmentStatus> = {
//   pending_payment: 'pending',
//   paid: 'pending',
//   shipped: 'in_transit',
//   received: 'delivered',
//   completed: 'delivered',
//   return_requested: 'in_transit',
//   returned: 'cancelled',
//   cancelled: 'cancelled',
// };

// const mapSubOrder = (subOrder: ApiSubOrder): SubOrder => ({
//   id: subOrder.id,
//   providerId: subOrder.providerId ?? '-',
//   shippingCost: subOrder.shippingCost,
//   shipmentStatus: SUB_ORDER_TO_SHIPMENT[subOrder.status],
//   items: (subOrder.items ?? []).map((item) => ({
//     id: item.id,
//     name: item.name ?? 'Producto',
//     imageUrl: item.imageUrl,
//     sku: item.sku,
//     quantity: item.quantity,
//     unitPrice: item.unitPrice,
//     attributes: item.variantName ? [item.variantName] : undefined,
//   })),
// });

// export const mapApiOrderToOrder = (apiOrder: ApiOrder): Order => ({
//   id: apiOrder.id,
//   orderNumber: apiOrder.id.slice(0, 8),
//   createdAt: apiOrder.createdAt,
//   storeName: apiOrder.customerName,
//   status: mapOrderStatus(apiOrder.status),
//   total: apiOrder.total,
//   subOrders: apiOrder.subOrders.map(mapSubOrder),
// });

// export const mapApiOrdersToOrders = (apiOrders: ApiOrder[]): Order[] =>
//   apiOrders.map(mapApiOrderToOrder);

//v2
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
  items: (subOrder.items ?? []).map(mapItem),
});

export const mapApiOrderToOrder = (apiOrder: ApiOrder): Order => ({
  id: apiOrder.id,
  orderNumber: apiOrder.id.slice(0, 8),
  createdAt: apiOrder.createdAt,
  storeName: apiOrder.customerName,
  status: mapOrderStatus(apiOrder.status),
  total: apiOrder.total,
  subOrders: apiOrder.subOrders.map(mapSubOrder),
});

export const mapApiOrdersToOrders = (apiOrders: ApiOrder[]): Order[] =>
  apiOrders.map(mapApiOrderToOrder);