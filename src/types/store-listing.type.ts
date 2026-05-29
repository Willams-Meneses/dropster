// UI model para la tabla "Mis Productos en Tienda"
// Separado del Listing del catálogo porque tiene campos distintos:
// sellPrice (precio real del dropshipper), tiendanubeProductId para poder
// desvincular, y no tiene status de publicación.

export interface StoreListingVariant {
  dropshipperVariantId: string;
  variantId: string;
  tiendanubeProductId: string;
  tiendanubeVariantId: string;
  name: string;              // values.join(' / ')
  sku: string;
  cost: number;              // parseado de string
  suggestedPrice: number;    // parseado de string
  sellMargin: number;        // parseado de string
  sellPrice: number;         // parseado de string (lo que edita el dropshipper)
  stock: number;
  reservedStock: number;
}

export interface StoreListing {
  productId: string;
  name: string;
  imageUrl?: string;
  tags: string[];            // category.name si existe
  attributes: string[];      // e.g. ['Color', 'Talle']
  variants: StoreListingVariant[];
}