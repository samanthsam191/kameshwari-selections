import { create } from "zustand";
import type { Product } from "@/lib/mock-data";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  blouseOption: "running" | "unstitched" | "custom";
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) =>
          i.product.id === item.product.id &&
          i.selectedColor === item.selectedColor &&
          i.blouseOption === item.blouseOption
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === item.product.id &&
            i.selectedColor === item.selectedColor &&
            i.blouseOption === item.blouseOption
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    })),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const { items } = get();
    return items.reduce((total, item) => {
      const price = item.product.salePrice || item.product.basePrice;
      const blouseExtra = item.blouseOption === "custom" ? 500 : 0;
      return total + (price + blouseExtra) * item.quantity;
    }, 0);
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
}));
