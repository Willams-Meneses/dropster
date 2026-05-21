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
  cost: string;
  suggestedMargin: string;
  suggestedPrice: string;
  stock: number;
  reservedStock: number;
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
  isActive: boolean;   // ← agregar
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