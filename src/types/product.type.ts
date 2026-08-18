export const CARD_VARIANT = {
  DEFAULT: 'default',
  FEATURED: 'featured',
} as const;

export type CardVariant = typeof CARD_VARIANT[keyof typeof CARD_VARIANT];

// ─── API response types ───────────────────────────────────────────────────────

export interface ProductImage {
  url: string;
  publicId: string;
}

export interface ProductVariant {
  id: string;
  values: string[];
  sku: string | null;
  barcode: string | null;
  cost: string;
  suggestedMargin: string;
  suggestedPrice: string;
  stock: number;
  reservedStock: number;
  weight: string | null;
  width: string | null;
  height: string | null;
  depth: string | null;
  images: ProductImage[];
  isActive: boolean;
}

export interface ProductProvider {
  id: string;
  firstName: string;
  lastName: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  description: string | null;
  attributes: string[];
  images: ProductImage[];
  createdAt: string;
  provider: ProductProvider;
  category: ProductCategory | null;
  variants: ProductVariant[];
  isActive: boolean;
  updatedAt: string;
}

// ─── UI model (lo que espera CardProduct) ─────────────────────────────────────

export type StockLabel = 'En stock' | 'Sin stock' | 'Pocas unidades';

export interface Product {
  id: string;
  name: string;
  price: number;
  suggestedPrice: number;
  profitPercentage: number;
  stock: StockLabel;
  imageUrl: string;
  category: string;
  isHighlighted?: boolean;
}

// ─── Create product ───────────────────────────────────────────────────────────

// Una imagen puede ser nueva (base64) o ya existente en Cloudinary (url + publicId)
export type ProductImagePayload =
  | { base64: string; mimetype: string; url?: undefined; publicId?: undefined }
  | { url: string; publicId: string; mimetype: string; base64?: undefined };

export interface CreateProductImagePayload {
  base64: string;
  mimetype: string;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  categoryId: string;
  attributes: string[];
  images: ProductImagePayload[];
  variants: unknown[];
}

export interface CreateProductResponse {
  id: string;
  name: string;
}

// ─── Update product ───────────────────────────────────────────────────────────

export interface UpdateProductVariantPayload {
  values: string[];
  sku?: string;
  cost: string;
  suggestedMargin: string;
  suggestedPrice: string;
  stock: number;
  weight?: string;
  depth?: string;
  width?: string;
  height?: string;
  images?: ProductImagePayload[];
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  categoryId?: string;
  attributes?: string[];
  images?: ProductImagePayload[];
  variants?: UpdateProductVariantPayload[];
}

export interface UpdateProductResponse {
  id: string;
  name: string;
}