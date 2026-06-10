// ─── Property types ────────────────────────────────────────────────────────────

export type PropertyType = 'color' | 'talle' | 'modelo';

export interface ColorValue {
  name: string;
  hex: string;
}

export interface PropertyColor {
  type: 'color';
  name: string;
  values: ColorValue[];
}

export interface PropertyTalle {
  type: 'talle';
  name: string;
  values: string[]; // e.g. ['XS','S','M','L','XL']
}

export interface PropertyModelo {
  type: 'modelo';
  name: string;
  values: string[]; // free text
}

export type Property = PropertyColor | PropertyTalle | PropertyModelo;

// ─── Variant (generated combination) ──────────────────────────────────────────

export interface VariantFormValue {
  /** e.g. ['Azul Vibrante', 'XS'] — ordered by property */
  values: string[];
  sku: string;
  cost: string;
  suggestedMargin: string;
  suggestedPrice: string;
  stock: number;
  weight: string;
  depth: string;      // ← agregá
  width: string;      // ← agregá
  height: string;  
  visible: boolean;
  /** base64 images for this specific variant */
  images: Array<{ base64: string; mimetype: string }>;
}

// ─── Preset data ───────────────────────────────────────────────────────────────

export const COLOR_PRESETS: ColorValue[] = [
  { name: 'Azul Vibrante',    hex: '#1565C0' },
  { name: 'Rojo Ardiente',    hex: '#C62828' },
  { name: 'Amarillo Soleado', hex: '#F9A825' },
  { name: 'Verde Esmeralda',  hex: '#2E7D32' },
  { name: 'Neblina Púrpura',  hex: '#6A1B9A' },
  { name: 'Rosa Coral',       hex: '#E91E8C' },
  { name: 'Turquesa',         hex: '#00838F' },
  { name: 'Magia Magenta',    hex: '#AD1457' },
  { name: 'Blanco',           hex: '#FFFFFF' },
  { name: 'Negro',            hex: '#000000' },
  { name: 'Gris Plata',       hex: '#9E9E9E' },
  { name: 'Naranja Solar',    hex: '#E65100' },
];

export const TALLE_PRESETS: Record<string, string[]> = {
  Adultos: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  Números: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
  Bebés:   ['0-3m', '3-6m', '6-12m', '12-18m', '18-24m'],
};