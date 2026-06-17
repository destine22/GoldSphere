-- Run this script in Supabase SQL Editor to set up storage for product images
-- Go to: https://supabase.com/dashboard/project/ofpordsduouttcpgwknn/sql/new

-- 1. Enable the storage extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the product-images bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 3. Policy: Allow public access to view images
DROP POLICY IF EXISTS "Public Access for product-images" ON storage.objects;
CREATE POLICY "Public Access for product-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- 4. Policy: Allow authenticated users to upload images
DROP POLICY IF EXISTS "Allow authenticated uploads to product-images" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to product-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- 5. Policy: Allow users to delete their own images (optional but useful)
DROP POLICY IF EXISTS "Allow users to delete their own product-images" ON storage.objects;
CREATE POLICY "Allow users to delete their own product-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');

SELECT '✅ Storage setup complete! You can now upload product images!' AS message;
