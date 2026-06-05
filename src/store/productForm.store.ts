import { create } from 'zustand';
import type { CreateProductFormValues } from '@/schemas/product.schema';

interface ProductFormState {
  formData: Partial<CreateProductFormValues>;
  serverError: string | null;
  setFormData: (data: Partial<CreateProductFormValues>) => void;
  setServerError: (error: string | null) => void;
  reset: () => void;
}

const initialFormData: Partial<CreateProductFormValues> = {
  name: '',
  description: '',
  categoryId: '',
  images: [],
};

export const useProductFormStore = create<ProductFormState>((set) => ({
  formData: initialFormData,
  serverError: null,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setServerError: (error) => set({ serverError: error }),
  reset: () => set({ formData: initialFormData, serverError: null }),
}));