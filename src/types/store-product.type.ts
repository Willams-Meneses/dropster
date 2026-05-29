// ─── API response: GET /store/products ───────────────────────────────────────
// Shape diferente a ApiProduct (productos del catálogo general).
// Acá cada item ya trae la info de dropshipper: sellMargin, sellPrice,
// tiendanubeProductId / tiendanubeVariantId, dropshipperVariantId.

export interface StoreProductImage {
  url: string;
  publicId: string;
}

export interface StoreProductCategory {
  id: string;
  name: string;
}

export interface StoreProductInfo {
  id: string;
  name: string;
  attributes: string[];
  images: StoreProductImage[];
  category: StoreProductCategory | null;
}

export interface StoreVariant {
  dropshipperVariantId: string;
  variantId: string;
  tiendanubeProductId: string;
  tiendanubeVariantId: string;
  values: string[];
  sku: string;
  cost: string;           // precio de costo del proveedor (varchar)
  suggestedPrice: string; // precio sugerido por el proveedor (varchar)
  sellMargin: string;     // margen que fijó el dropshipper (varchar)
  sellPrice: string;      // precio de venta real del dropshipper (varchar)
  stock: number;
  reservedStock: number;
}

export interface StoreProductItem {
  product: StoreProductInfo;
  variants: StoreVariant[];
}