'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import type { Profile } from '@/types/supabase';

export async function getUsers(): Promise<Profile[]> {
  const supabase = createAdminClient();
  const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function getUserById(id: string): Promise<Profile | null> {
  const supabase = createAdminClient();
  const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
  return data;
}

export async function updateUserRole(id: string, role: string): Promise<void> {
  const supabase = createAdminClient();
  await supabase.from('profiles').update({ role }).eq('id', id);
  revalidatePath('/admin/users');
}

export async function updateUserStatus(id: string, status: string): Promise<void> {
  const supabase = createAdminClient();
  await supabase.from('profiles').update({ status }).eq('id', id);
  revalidatePath('/admin/users');
}

export async function deleteUser(id: string): Promise<void> {
  const supabase = createAdminClient();
  await supabase.auth.admin.deleteUser(id);
  revalidatePath('/admin/users');
}
