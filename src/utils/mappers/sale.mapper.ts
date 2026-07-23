import type {
  ApiSale,
  ApiSaleItem,
  Sale,
  SaleItem,
  SaleStatus,
} from '@/types/sale.type';

const mapSaleStatus = (status: ApiSale['status']): SaleStatus => {
  switch (status) {
    case 'paid':
      return 'ready_to_dispatch';
    case 'shipped':
      return 'in_process';
    case 'delivered':
      return 'delivered';
    case 'returned':
      return 'returned';
    default:
      return 'not_delivered';
  }
};

const mapSaleItem = (item: ApiSaleItem): SaleItem => ({
  id: item.id,
  name: item.variant.product?.name ?? 'Producto',
  imageUrl: item.variant.images?.[0]?.url ?? item.variant.product?.images?.[0]?.url,
  sku: item.variant.sku,
  quantity: item.quantity,
  unitPrice: item.unitPrice,
  attributes: item.variant.values,
});

export const mapApiSaleToSale = (apiSale: ApiSale): Sale => {
  const items = (apiSale.items ?? []).map(mapSaleItem);
  const itemsTotal = items.reduce(
    (acc, item) => acc + Number(item.unitPrice) * item.quantity,
    0
  );
  const shippingCostNum = Number(apiSale.shippingCost) || 0;

  return {
    id: apiSale.id,
    orderNumber: apiSale.order.id.slice(0, 8),
    createdAt: apiSale.createdAt,
    customerName: apiSale.order.customerName,
    status: mapSaleStatus(apiSale.status),
    total: itemsTotal + shippingCostNum,
    shippingCost: apiSale.shippingCost,
    trackingUrl: apiSale.tracking,
    items,
  };
};

export const mapApiSalesToSales = (apiSales: ApiSale[]): Sale[] =>
  apiSales.map(mapApiSaleToSale);