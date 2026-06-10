import { create } from 'zustand';
import type { CreateProductFormValues } from '@/schemas/product.schema';
import type { Property, VariantFormValue } from '@/types/variant.type';
import type { ImagePreview } from '@/utils/imageUtils';

// ─── Variant helpers ───────────────────────────────────────────────────────────

function cartesian(arrays: string[][]): string[][] {
  return arrays.reduce<string[][]>(
    (acc, arr) => acc.flatMap((combo) => arr.map((val) => [...combo, val])),
    [[]],
  );
}

export function buildVariants(properties: Property[]): VariantFormValue[] {
  if (properties.length === 0) return [];

  const valueSets = properties.map((p) =>
    p.type === 'color' ? p.values.map((c) => c.name) : p.values,
  );

  return cartesian(valueSets).map((combo) => ({
    values: combo,
    sku: '',
    cost: '0',
    suggestedMargin: '50',
    suggestedPrice: '0',
    stock: 0,
    weight: '0',
    depth: '0',
    width: '0',
    height: '0',
    visible: true,
    images: [],
  }));
}

// ─── Store ─────────────────────────────────────────────────────────────────────

interface ProductFormState {
  formData: Partial<CreateProductFormValues>;
  serverError: string | null;

  // Variants / properties
  properties: Property[];
  variants: VariantFormValue[];
  productPhotos: ImagePreview[];

  setFormData: (data: Partial<CreateProductFormValues>) => void;
  setProductPhotos: (photos: ImagePreview[]) => void;
  setServerError: (error: string | null) => void;
  reset: () => void;

  addProperty: (prop: Property) => void;
  removeProperty: (index: number) => void;
  updateVariant: (index: number, patch: Partial<VariantFormValue>) => void;
}

const initialFormData: Partial<CreateProductFormValues> = {
  name: '',
  description: '',
  categoryId: '',
  images: [],
};

export const useProductFormStore = create<ProductFormState>((set, get) => ({
  formData: initialFormData,
  serverError: null,
  properties: [],
  variants: [],
  productPhotos: [],
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),

  setProductPhotos: (photos) => set({ productPhotos: photos }),

  setServerError: (error) => set({ serverError: error }),

  reset: () =>
    set({ formData: initialFormData, serverError: null, properties: [], variants: [], productPhotos: [] }),

  addProperty: (prop) => {
    const properties = [...get().properties, prop];
    set({ properties, variants: buildVariants(properties) });
  },

  removeProperty: (index) => {
    const properties = get().properties.filter((_, i) => i !== index);
    set({ properties, variants: buildVariants(properties) });
  },

  updateVariant: (index, patch) => {
    const variants = get().variants.map((v, i) => (i === index ? { ...v, ...patch } : v));
    set({ variants });
  },
}));