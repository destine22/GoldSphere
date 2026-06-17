"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendWelcomeEmail } from "@/lib/resend/emailService";

export async function signUp(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirm_password = formData.get("confirm_password") as string;

  if (password !== confirm_password) {
    return { error: "Passwords do not match" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/account`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Send welcome email (fire and forget)
  if (data.user) {
    void sendWelcomeEmail(email, full_name);
  }

  revalidatePath("/", "layout");
  
  // Check if email confirmation is enabled
  if (data?.session) {
    // User is already signed in (no email confirmation)
    redirect("/account");
  } else {
    // Email confirmation required
    redirect("/?welcome=true&confirm=true");
  }
}

export async function signIn(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectedFrom = formData.get("redirectedFrom") as string | null;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect(redirectedFrom || "/account");
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getSession() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile };
}

export async function updateProfile(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const full_name = formData.get("full_name") as string | null;
  const avatar_url = formData.get("avatar_url") as string | null;
  const country = formData.get("country") as string | null;

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name,
      avatar_url,
      country,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/account");
  return { success: true };
}
