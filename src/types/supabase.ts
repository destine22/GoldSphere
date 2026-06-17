export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  status: string;
  country: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  how_to_use: string | null;
  storage_instructions: string | null;
  price: number; // Nigerian Naira (NGN)
  category: string;
  origin_country: string | null;
  weight: string | null;
  unit: string | null;
  image_url: string | null;
  rating: number;
  review_count: number;
  is_in_stock: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  country: string;
  zip: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_name: string | null;
  customer_email: string | null;
  status: string;
  payment_status: string;
  total_amount: number; // Nigerian Naira (NGN)
  shipping_address: ShippingAddress;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string | null;
  quantity: number;
  unit_price: number; // Nigerian Naira (NGN)
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile>;
        Update: Partial<Profile>;
      };
      products: {
        Row: Product;
        Insert: Partial<Product>;
        Update: Partial<Product>;
      };
      orders: {
        Row: Order;
        Insert: Partial<Order>;
        Update: Partial<Order>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Partial<OrderItem>;
        Update: Partial<OrderItem>;
      };
      cart_items: {
        Row: CartItem;
        Insert: Partial<CartItem>;
        Update: Partial<CartItem>;
      };
    };
  };
};

export type Currency = {
  code: 'NGN';
  symbol: '₦';
  name: 'Nigerian Naira';
};
