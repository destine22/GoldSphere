'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export async function uploadImage(formData: FormData) {
  const supabase = createAdminClient()
  const file = formData.get('file') as File

  if (!file) {
    return { error: 'No file provided' }
  }

  // Check file type
  if (!file.type.startsWith('image/')) {
    return { error: 'Only image files are allowed' }
  }

  // Check file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'File size must be less than 5MB' }
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
  const filePath = `products/${fileName}`

  // Upload to Supabase Storage using Admin Client (bypasses RLS)
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Full upload error:', JSON.stringify(error, null, 2))
    return { 
      error: `Upload failed: ${error.message} (${error.name}). Please make sure the storage bucket exists and is public.`,
      details: error
    }
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return { url: publicUrl }
}
