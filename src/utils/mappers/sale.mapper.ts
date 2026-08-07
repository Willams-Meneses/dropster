import type { ApiSale, ApiSaleItem, Sale, SaleItem, SaleStatus } from '@/types/sale.type';
import type { ApiSubOrderStatus } from '@/types/order.type';

const SALE_STATUS_MAP: Record<ApiSubOrderStatus, SaleStatus> = {
  pending_payment: 'ready_to_dispatch', // no debería aparecer en Sales (se filtra en el back), fallback seguro
  paid: 'ready_to_dispatch',
  shipped: 'in_process',
  received: 'delivered',
  completed: 'delivered',
  return_requested: 'return_requested',
  returned: 'returned',
  cancelled: 'cancelled',
};

const mapSaleStatus = (status: ApiSubOrderStatus): SaleStatus => SALE_STATUS_MAP[status];

const mapSaleItem = (item: ApiSaleItem): SaleItem => ({
  id: item.id,
  name: item.variant.product?.name ?? 'Producto',
  imageUrl: item.variant.images?.[0]?.url ?? item.variant.product?.images?.[0]?.url,
  sku: item.variant.sku,
  quantity: item.quantity,
  unitPrice: item.unitPrice,
  attributes: item.variant.values,
});

const buildTrackingUrl = (tracking: string | null): string | undefined =>
  tracking ? `https://www.oca.com.ar/DoorToDoor/Tracking/?number=${tracking}` : undefined;

export const mapApiSaleToSale = (apiSale: ApiSale): Sale => {
  const items = (apiSale.items ?? []).map(mapSaleItem);
  const itemsTotal = items.reduce((acc, item) => acc + Number(item.unitPrice) * item.quantity, 0);
  const shippingCostNum = Number(apiSale.shippingCost) || 0;

  return {
    id: apiSale.id,
    orderNumber: apiSale.order.id.slice(0, 8),
    createdAt: apiSale.createdAt,
    customerName: apiSale.order.customerName,
    customerEmail: apiSale.order.customerEmail,
    customerAddress: apiSale.order.customerAddress,
    customerCp: apiSale.order.customerCp,
    customerLocalidad: apiSale.order.customerLocalidad,
    customerProvincia: apiSale.order.customerProvincia,
    status: mapSaleStatus(apiSale.status),
    total: itemsTotal + shippingCostNum,
    shippingCost: apiSale.shippingCost,
    tracking: apiSale.tracking,
    trackingUrl: buildTrackingUrl(apiSale.tracking),
    items,
  };
};

export const mapApiSalesToSales = (apiSales: ApiSale[]): Sale[] => apiSales.map(mapApiSaleToSale);