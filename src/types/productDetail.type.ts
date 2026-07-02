// src/types/productDetail.type.ts
import type { ProductVariant } from '@/types/product.type';

export interface AttributeOption {
  /** nombre del atributo, ej "Color", "Talle", "Modelo" */
  name: string;
  /** índice de este atributo dentro de variant.values */
  index: number;
  /** tipo inferido para saber cómo renderizar (swatch, chip, etc) */
  type: 'color' | 'talle' | 'modelo';
  /** valores únicos disponibles para este atributo */
  values: string[];
}

export interface SelectedVariantInfo {
  variant: ProductVariant | undefined;
  isComplete: boolean;
}