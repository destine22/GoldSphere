"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import type { Product } from "@/types/supabase";

// Helper to create an anonymous client for public data (no cookies needed)
function getAnonymousClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  );
}

// For public product data (no cookies)
export async function getProductsPublic(): Promise<Product[]> {
  const supabase = getAnonymousClient();
  const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function getProductBySlugPublic(slug: string): Promise<Product | null> {
  const supabase = getAnonymousClient();
  const { data } = await supabase.from("products").select("*").eq("slug", slug).single();
  return data;
}

export async function getFeaturedProductsPublic(): Promise<Product[]> {
  const supabase = getAnonymousClient();
  const { data } = await supabase.from("products").select("*").eq("is_featured", true);
  return data || [];
}

// For authenticated product data (with cookies)
export async function getProducts(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("products").select("*").eq("slug", slug).single();
  return data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("products").select("*").eq("id", id).single();
  return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("products").select("*").eq("category", category);
  return data || [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase.from("products").select("*").eq("is_featured", true);
  return data || [];
}

export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`);
  return data || [];
}

export async function createProduct(productData: Partial<Product>): Promise<Product> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("products").insert(productData).select().single();

  if (error) throw error;
  revalidatePath("/products");
  revalidatePath("/admin/products");
  return data;
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("products")
    .update({ ...productData, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  revalidatePath("/products");
  revalidatePath("/admin/products");
  revalidatePath(`/products/${data.slug}`);
  return data;
}

export async function deleteProduct(id: string): Promise<void> {
  const supabase = createAdminClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/products");
  revalidatePath("/admin/products");
}
