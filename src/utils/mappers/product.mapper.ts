import type { ApiProduct, Product, StockLabel } from '@/types/product.type';

// Toma la variante de menor cost como precio base del producto en el listado
function resolveBaseVariant(variants: ApiProduct['variants']) {
  if (!variants.length) return null;
  return variants.reduce((min, v) =>
    parseFloat(v.cost) < parseFloat(min.cost) ? v : min,
  );
}

function resolveStock(variants: ApiProduct['variants']): StockLabel {
  const totalAvailable = variants.reduce(
    (sum, v) => sum + (v.stock - v.reservedStock),
    0,
  );
  if (totalAvailable === 0) return 'Sin stock';
  if (totalAvailable <= 10) return 'Pocas unidades';
  return 'En stock';
}

export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  const baseVariant = resolveBaseVariant(apiProduct.variants);

  const cost = baseVariant ? parseFloat(baseVariant.cost) : 0;
  const suggestedPrice = baseVariant ? parseFloat(baseVariant.suggestedPrice) : 0;
  const profitPercentage =
    cost > 0 ? Math.round(((suggestedPrice - cost) / cost) * 100) : 0;

  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: cost,
    suggestedPrice,
    profitPercentage,
    stock: resolveStock(apiProduct.variants),
    imageUrl: apiProduct.images[0]?.url ?? 'https://via.placeholder.com/400x300?text=Producto',
    category: apiProduct.category?.name ?? 'Sin categoría',
  };
}

export function mapApiProductsToProducts(apiProducts: ApiProduct[]): Product[] {
  return apiProducts.map(mapApiProductToProduct);
}