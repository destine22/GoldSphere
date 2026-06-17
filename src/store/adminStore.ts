import { create } from "zustand";
import { Product, products } from "@/data/products";
import { Order, AdminUser, adminOrders, adminUsers, Settings, initialSettings } from "@/data/adminData";

interface AdminStore {
  products: Product[];
  orders: Order[];
  users: AdminUser[];
  settings: Settings;
  selectedOrder: Order | null;
  selectedUser: AdminUser | null;
  isLoading: boolean;
  searchQuery: string;
  filterStatus: string;

  addProduct: (product: Omit<Product, "id" | "slug" | "rating" | "reviews">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  deleteOrder: (id: string) => void;
  setSelectedOrder: (order: Order | null) => void;
  updateUserStatus: (id: string) => void;
  deleteUser: (id: string) => void;
  setSelectedUser: (user: AdminUser | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
  setLoading: (loading: boolean) => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  products: products,
  orders: adminOrders,
  users: adminUsers,
  settings: initialSettings,
  selectedOrder: null,
  selectedUser: null,
  isLoading: false,
  searchQuery: "",
  filterStatus: "",

  addProduct: (productData) =>
    set((state) => {
      const newId = `new${Date.now()}`;
      const newSlug = productData.name.toLowerCase().replace(/\s+/g, "-");
      const newProduct: Product = {
        ...productData,
        id: newId,
        slug: newSlug,
        rating: 5,
        reviews: 0,
      };
      return { products: [...state.products, newProduct] };
    }),

  updateProduct: (id, productData) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...productData } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status, updatedAt: new Date().toISOString().split('T')[0] } : o
      ),
    })),

  deleteOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== id),
    })),

  setSelectedOrder: (order) => set({ selectedOrder: order }),

  updateUserStatus: (id) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),

  setSelectedUser: (user) => set({ selectedUser: user }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilterStatus: (status) => set({ filterStatus: status }),

  setLoading: (loading) => set({ isLoading: loading }),

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...newSettings,
        notifications: newSettings.notifications
          ? { ...state.settings.notifications, ...newSettings.notifications }
          : state.settings.notifications,
        security: newSettings.security
          ? { ...state.settings.security, ...newSettings.security }
          : state.settings.security,
      },
    })),
}));
