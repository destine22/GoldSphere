"use server";

import Stripe from "stripe";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Product, Order, OrderItem } from "@/types/supabase";
import { getCartItems, clearCart } from "@/actions/cart";

function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe not configured. Please set STRIPE_SECRET_KEY in your .env.local file.");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

interface CheckoutItem {
  product: Product;
  quantity: number;
}

export async function createCheckoutSession(items: CheckoutItem[]) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Demo mode: Skip Stripe if no secret key
  if (!process.env.STRIPE_SECRET_KEY) {
    return { 
      url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/checkout/success?session_id=demo_${Date.now()}` 
    };
  }

  // Get user profile to get email/name
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
        images: [item.product.image_url].filter(Boolean) as string[],
      },
      unit_amount: Math.round(item.product.price * 100), // Convert to cents
    },
    quantity: item.quantity,
  }));

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: profile?.email || user.email,
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/checkout/cancel`,
    metadata: {
      userId: user.id,
      cartItems: JSON.stringify(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        }))
      ),
    },
  });

  return { url: session.url };
}

export async function createOrderFromStripeSession(sessionId: string) {
  const supabase = await createServerSupabaseClient();
  
  // Demo mode: Create order without Stripe
  if (sessionId.startsWith("demo_")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Create a dummy order in demo mode
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: 0, // We don't have cart items here in demo, but it's okay for testing
        status: "paid",
        payment_id: sessionId,
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }

    // Clear cart even in demo mode
    await clearCart();

    return order;
  }

  // Real Stripe mode
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  if (!session.metadata?.userId || !session.metadata?.cartItems) {
    throw new Error("Invalid session metadata");
  }

  const cartItems = JSON.parse(session.metadata.cartItems);
  const userId = session.metadata.userId;

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      total_amount: session.amount_total ? session.amount_total / 100 : 0,
      status: "paid",
      payment_id: session.id,
      shipping_address: JSON.stringify(session.customer_details?.address),
      email: session.customer_details?.email,
    })
    .select()
    .single();

  if (orderError) {
    throw new Error(`Failed to create order: ${orderError.message}`);
  }

  // Create order items
  const orderItems = cartItems.map((item: any) => ({
    order_id: order.id,
    product_id: item.productId,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    throw new Error(`Failed to create order items: ${itemsError.message}`);
  }

  // Clear cart after order is created
  await clearCart();

  return order;
}
