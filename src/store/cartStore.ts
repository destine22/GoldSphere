import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product as SupabaseProduct, CartItemWithProduct } from "@/types/supabase";
import {
  getCartItems as getCartItemsAction,
  addToCart as addToCartAction,
  updateCartItemQuantity as updateCartItemQuantityAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
} from "@/actions/cart";

// For compatibility with existing code
export interface CartItem {
  product: SupabaseProduct;
  quantity: number;
  id?: string; // For authenticated users, to track cart item ID
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  userId?: string;
  addItem: (product: SupabaseProduct, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  syncCartWithDatabase: () => Promise<void>;
  setAuthenticated: (isAuthenticated: boolean, userId?: string) => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isAuthenticated: false,
      isLoading: false,

      addItem: async (product, quantity = 1) => {
        set({ isLoading: true });
        try {
          if (get().isAuthenticated && get().userId) {
            await addToCartAction(product.id, quantity);
            await get().syncCartWithDatabase();
          } else {
            set((state) => {
              const existingItem = state.items.find(
                (item) => item.product.id === product.id
              );
              if (existingItem) {
                return {
                  items: state.items.map((item) =>
                    item.product.id === product.id
                      ? { ...item, quantity: item.quantity + quantity }
                      : item
                  ),
                };
              }
              return {
                items: [...state.items, { product, quantity }],
              };
            });
          }
        } catch (error) {
          console.error('[CartStore] Error adding item to cart:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (productId) => {
        set({ isLoading: true });
        try {
          if (get().isAuthenticated && get().userId) {
            // Find cart item ID
            const itemToRemove = get().items.find(
              (item) => item.product.id === productId
            );
            if (itemToRemove?.id) {
              await removeFromCartAction(itemToRemove.id);
            }
            await get().syncCartWithDatabase();
          } else {
            set((state) => ({
              items: state.items.filter((item) => item.product.id !== productId),
            }));
          }
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (productId, quantity) => {
        set({ isLoading: true });
        try {
          if (get().isAuthenticated && get().userId) {
            const itemToUpdate = get().items.find(
              (item) => item.product.id === productId
            );
            if (itemToUpdate?.id) {
              await updateCartItemQuantityAction(itemToUpdate.id, quantity);
            }
            await get().syncCartWithDatabase();
          } else {
            if (quantity <= 0) {
              await get().removeItem(productId);
              return;
            }
            set((state) => ({
              items: state.items.map((item) =>
                item.product.id === productId ? { ...item, quantity } : item
              ),
            }));
          }
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: async () => {
        set({ isLoading: true });
        try {
          if (get().isAuthenticated && get().userId) {
            await clearCartAction();
            await get().syncCartWithDatabase();
          } else {
            set({ items: [] });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      syncCartWithDatabase: async () => {
        set({ isLoading: true });
        try {
          const items = await getCartItemsAction();
          set({
            items: items.map((item) => ({
              product: item.product,
              quantity: item.quantity,
              id: item.id,
            })),
          });
        } finally {
          set({ isLoading: false });
        }
      },

      setAuthenticated: async (isAuthenticated: boolean, userId?: string) => {
        if (isAuthenticated && userId) {
          set({ isAuthenticated: true, userId, isLoading: true });
          try {
            await get().syncCartWithDatabase();
          } finally {
            set({ isLoading: false });
          }
        } else {
          set({ isAuthenticated: false, userId: undefined, items: [] });
        }
      },
    }),
    {
      name: "goldsphere-cart-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        // Only persist local state when not authenticated
        items: state.isAuthenticated ? [] : state.items,
        isOpen: state.isOpen,
      }),
      skipHydration: true,
    }
  )
);

// Selector hooks
export const useTotalItems = () =>
  useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

export const useTotalPrice = () =>
  useCartStore((state) =>
    state.items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  );
