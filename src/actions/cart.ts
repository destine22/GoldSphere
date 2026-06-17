"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CartItemWithProduct, CartItem } from "@/types/supabase";

export async function getCartItems(): Promise<CartItemWithProduct[]> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data } = await supabase
    .from("cart_items")
    .select(`
      *,
      products (*)
    `)
    .eq("user_id", user.id);

  // Map the data to correct type
  return (
    data?.map((item: any) => ({
      ...item,
      product: item.products,
    })) || []
  );
}

export async function addToCart(productId: string, quantity: number = 1): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Check if item already exists in cart
  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existingItem) {
    // Update quantity
    await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id);
  } else {
    // Insert new item
    await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: productId,
      quantity,
    });
  }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number): Promise<void> {
  const supabase = await createServerSupabaseClient();

  if (quantity <= 0) {
    await removeFromCart(cartItemId);
    return;
  }

  await supabase.from("cart_items").update({ quantity }).eq("id", cartItemId);
}

export async function removeFromCart(cartItemId: string): Promise<void> {
  const supabase = await createServerSupabaseClient();
  await supabase.from("cart_items").delete().eq("id", cartItemId);
}

export async function clearCart(): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase.from("cart_items").delete().eq("user_id", user.id);
}
