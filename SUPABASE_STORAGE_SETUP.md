# Supabase Storage Setup for Product Images

To use the image upload feature, follow these simple steps:

## Quick Setup (Recommended)
1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/ofpordsduouttcpgwknn
2. Click on **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy and paste the contents of `supabase/setup_storage.sql`
5. Click **Run** to execute the script

That's it! The script will:
- Create the `product-images` bucket (public)
- Set up all necessary policies

## Manual Setup (if needed)
If you prefer to set it up manually:

### 1. Create the Storage Bucket
1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Name it: `product-images`
4. Set the bucket to **Public**
5. Click **Create bucket**

### 2. Set up Storage Policies
Use the SQL Editor to run the policies from `setup_storage.sql`

## Test the Upload
Now you're ready to use the image upload feature in your admin product form!

---

## Troubleshooting
If you get upload errors:
- Make sure the bucket name is exactly `product-images`
- Check that the bucket is set to **Public**
- Look at your server terminal logs for detailed error messages

