import { create } from 'zustand';
import type { ProductVariant } from '@/types/product.type';

export interface CartItem {
  variantId: string;
  productId: string;
  productName: string;
  variant: ProductVariant; // Contiene values, images, price, etc.
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  // Actions
  addItem: (variant: ProductVariant, productId: string, productName: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
}

// IMPORTANTE: totalItems y totalPrice NO viven en el estado del store.
// Antes estaban definidos como getters dentro del objeto de Zustand, pero
// Zustand mergea el estado en cada `set()` con algo equivalente a
// `Object.assign({}, state, partial)`. Object.assign LEE el valor del getter
// y lo copia como número plano (no copia el getter), así que después del
// primer `set()` esos valores quedaban "congelados" en el resultado de esa
// primera lectura (0) para siempre. Por eso el contador nunca se actualizaba.
//
// La solución es calcular estos valores derivados con selectores, para que
// se recalculen en cada render a partir de `items`.
export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (variant, productId, productName) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(item => item.variantId === variant.id);

    if (existingItem) {
      // Si ya existe, limitamos al stock disponible
      const newQuantity = Math.min(existingItem.quantity + 1, variant.stock);
      set({
        items: currentItems.map(item =>
          item.variantId === variant.id ? { ...item, quantity: newQuantity } : item
        )
      });
    } else {
      set({
        items: [...currentItems, {
          variantId: variant.id,
          productId,
          productName,
          variant,
          quantity: 1
        }]
      });
    }
  },

  updateQuantity: (variantId, quantity) => {
    const currentItems = get().items;
    const item = currentItems.find(i => i.variantId === variantId);
    if (!item) return;

    const clampedQuantity = Math.max(1, Math.min(quantity, item.variant.stock));
    set({
      items: currentItems.map(i =>
        i.variantId === variantId ? { ...i, quantity: clampedQuantity } : i
      )
    });
  },

  removeItem: (variantId) => {
    set({ items: get().items.filter(item => item.variantId !== variantId) });
  },

  clearCart: () => set({ items: [] }),
}));

// Selectores derivados: se recalculan en cada render en base a `items`,
// y como son selectores de Zustand, el componente sólo re-renderiza cuando
// el valor calculado efectivamente cambia.
export const useCartTotalItems = () =>
  useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

export const useCartTotalPrice = () =>
  useCartStore((state) =>
    state.items.reduce((acc, item) => acc + Number(item.variant.suggestedPrice) * item.quantity, 0)
  );