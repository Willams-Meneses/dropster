import type { StoreListing, StoreListingVariant } from "@/types/store-listing.type";
import type { StoreProductItem } from "@/types/store-product.type";


export function mapStoreProductToStoreListing(item: StoreProductItem): StoreListing {
  const variants: StoreListingVariant[] = item.variants.map((v) => ({
    dropshipperVariantId: v.dropshipperVariantId,
    variantId: v.variantId,
    tiendanubeProductId: v.tiendanubeProductId,
    tiendanubeVariantId: v.tiendanubeVariantId,
    name: v.values.join(' / '),
    sku: v.sku,
    cost: parseFloat(v.cost),
    suggestedPrice: parseFloat(v.suggestedPrice),
    sellMargin: parseFloat(v.sellMargin),
    sellPrice: parseFloat(v.sellPrice),
    stock: v.stock,
    reservedStock: v.reservedStock,
  }));

  return {
    productId: item.product.id,
    name: item.product.name,
    imageUrl: item.product.images[0]?.url,
    tags: item.product.category ? [item.product.category.name] : [],
    attributes: item.product.attributes,
    variants,
  };
}

export function mapStoreProductsToStoreListings(items: StoreProductItem[]): StoreListing[] {
  return items.map(mapStoreProductToStoreListing);
}