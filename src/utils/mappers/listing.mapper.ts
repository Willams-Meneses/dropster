import type { ApiProduct } from '@/types/product.type';
import type { Listing, ListingVariant } from '@/types/listings.type';

export function mapApiProductToListing(product: ApiProduct): Listing {
  const variants: ListingVariant[] = product.variants.map((v) => {
    const cost = parseFloat(v.cost);
    const suggestedPrice = parseFloat(v.suggestedPrice);

    return {
      id: v.id,
      name: v.values.join(' / '),
      stock: v.stock,
      droppersPrice: cost,
      suggestedPrice: suggestedPrice,
      visible: v.isActive ?? true,
    };
  });

  // Status derivado de isActive del producto
  const status: Listing['status'] = product.isActive ? 'active' : 'hidden';

  return {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0]?.url,
    tags: product.category ? [product.category.name] : [],
    status,
    variants,
  };
}

export function mapApiProductsToListings(products: ApiProduct[]): Listing[] {
  return products.map(mapApiProductToListing);
}