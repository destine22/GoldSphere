-- Fix RLS policies to allow admin access

-- First, make sure profiles readable by admins
DROP POLICY IF EXISTS "Users can select their own profile" ON public.profiles;

-- Allow users to see their own profile
CREATE POLICY "Users can select their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow users can update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- IMPORTANT: For the middleware to work properly, we need to make sure
-- the service role can bypasses RLS or we need to adjust

-- Alternatively, add a policy that allows authenticated users to read profiles
-- but actually, the middleware is running with the user's own auth, so it should be able to see their own profile.
