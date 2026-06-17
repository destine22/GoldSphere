"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import type { Order, OrderItem, ShippingAddress, CartItemWithProduct } from "@/types/supabase";
import { clearCart } from "@/actions/cart";
import { sendOrderConfirmation, sendNewOrderAdminNotification, sendOrderStatusUpdate } from "@/lib/resend/emailService";

export async function createOrder(
  userId: string,
  cartItems: CartItemWithProduct[],
  shippingAddress: ShippingAddress,
  customerName: string,
  customerEmail: string
): Promise<Order> {
  const supabase = await createServerSupabaseClient();

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  // Generate order number using database function or client-side (we'll do client-side here for simplicity)
  const orderNumber = `GS-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 10000)
  ).padStart(4, "0")}`;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      user_id: userId,
      customer_name: customerName,
      customer_email: customerEmail,
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      status: "pending",
      payment_status: "unpaid",
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItems: Partial<OrderItem>[] = cartItems.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product.name,
    quantity: item.quantity,
    unit_price: item.product.price,
  }));

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
  if (itemsError) throw itemsError;

  // Clear cart
  await clearCart();

  // Send order confirmation and admin notification (fire and forget)
  const orderItemsForEmail = cartItems.map(item => ({
    name: item.product.name,
    quantity: item.quantity,
    unitPrice: item.product.price
  }));
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  
  void sendOrderConfirmation(customerEmail, {
    customerName,
    orderNumber: order.order_number.replace("GS-", ""),
    orderItems: orderItemsForEmail,
    shippingAddress: {
      street: shippingAddress.street || "",
      city: shippingAddress.city || "",
      country: shippingAddress.country || "",
      zip: shippingAddress.zip || ""
    },
    total: totalAmount,
    orderUrl: `${baseUrl}/account/orders/${order.id}`
  });
  
  void sendNewOrderAdminNotification({
    orderNumber: order.order_number.replace("GS-", ""),
    customerName,
    customerEmail,
    orderItems: orderItemsForEmail,
    total: totalAmount,
    shippingAddress: {
      street: shippingAddress.street || "",
      city: shippingAddress.city || "",
      country: shippingAddress.country || "",
      zip: shippingAddress.zip || ""
    }
  });

  return order;
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const supabase = await createServerSupabaseClient();
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return orders || [];
}

export async function getOrderById(id: string): Promise<(Order & { items: OrderItem[] }) | null> {
  const supabase = await createServerSupabaseClient();
  const { data: order } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *
      )
    `)
    .eq("id", id)
    .single();

  return order as (Order & { items: OrderItem[] }) || null;
}

export async function getAllOrders(): Promise<(Order & { items: OrderItem[]; profile: any })[]> {
  const supabase = createAdminClient();
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *
      ),
      profiles (
        *
      )
    `)
    .order("created_at", { ascending: false });
  return orders as any;
}

export async function updateOrderStatus(id: string, status: string): Promise<Order> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  
  // Send order status update email (fire and forget)
  if (data.customer_email) {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    
    const statusMessages: Record<string, string> = {
      pending: "Thank you for your order! We've received your order and are preparing it for you.",
      processing: "Great news! We're currently preparing your order for shipment.",
      shipped: "Your order is on its way! Our delivery partner has picked up your package.",
      delivered: "Your order has been delivered! Enjoy your authentic African ingredients.",
      cancelled: "We're sorry, your order has been cancelled. If you have questions, please contact us."
    };
    
    const message = statusMessages[status] || statusMessages.pending;
    
    void sendOrderStatusUpdate(data.customer_email, {
      customerName: data.customer_name || "Customer",
      orderNumber: data.order_number?.replace("GS-", "") || id,
      status,
      message,
      orderUrl: `${baseUrl}/account/orders/${id}`
    });
  }
  
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  return data;
}
