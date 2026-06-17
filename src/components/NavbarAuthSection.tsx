'use client';

import { useEffect, useState } from 'react';
import NavbarAuthButtons from './NavbarAuthButtons';
import { getUser } from '@/actions/auth';
import { RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function NavbarAuthSection() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await getUser();
      setUserData(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUserData({ user: null, profile: null });
    } finally {
      setLoading(false);
    }
  };

  // Refresh on mount and when auth state changes
  useEffect(() => {
    fetchUser();
    
    // Listen for Supabase auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Refresh user data whenever auth state changes
        fetchUser();
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Refresh on page visibility change (when user comes back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchUser();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (loading) {
    return <div className="w-10 h-10 rounded-full bg-[#8B5E3C] flex items-center justify-center">
      <RefreshCw className="w-5 h-5 text-[#D4A017] animate-spin" />
    </div>;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={fetchUser}
        className="p-2 rounded-lg hover:bg-[#3D2010] transition-colors"
        title="Refresh auth state"
      >
        <RefreshCw className="w-4 h-4 text-[#8B5E3C] hover:text-[#D4A017]" />
      </button>
      <NavbarAuthButtons userData={userData} />
    </div>
  );
}
