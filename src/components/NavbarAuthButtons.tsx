'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useCartStore } from '@/store/cartStore';

interface UserData {
  user: { id: string; email: string } | null;
  profile: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string;
  } | null;
}

export default function NavbarAuthButtons({ userData }: { userData: UserData }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const setAuthenticated = useCartStore((state) => state.setAuthenticated);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (userData.user && userData.profile) {
      setAuthenticated(true, userData.user.id);
    } else {
      setAuthenticated(false);
    }
  }, [userData, setAuthenticated]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!userData.user || !userData.profile) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="px-4 py-2 border border-[#D4A017] rounded-lg text-[#D4A017] font-semibold hover:bg-[#D4A017]/10 transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-gradient-to-r from-[#D4A017] to-[#E8780C] rounded-lg text-[#1A0800] font-bold hover:opacity-90 transition-opacity"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2"
      >
        {userData.profile.avatar_url ? (
          <img
            src={userData.profile.avatar_url}
            alt={userData.profile.full_name || 'User'}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#D4A017]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E8780C] flex items-center justify-center border-2 border-[#D4A017]">
            <span className="text-[#1A0800] font-bold">
              {getInitials(userData.profile.full_name)}
            </span>
          </div>
        )}
      </button>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setDropdownOpen(false)}
          />
          <div
            className="absolute right-0 top-12 z-50 min-w-[200px] rounded-xl border border-[#8B5E3C] bg-[#2C1A0E] py-2 shadow-xl"
          >
            <div className="px-4 py-2 border-b border-[#8B5E3C]">
              <p className="text-[#E8D5A3] font-semibold">
                Hi, {userData.profile.full_name || userData.user.email}
              </p>
            </div>
            <Link
              href="/account"
              className="block px-4 py-2 text-[#E8D5A3] hover:bg-[#3D2010] transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              My Account
            </Link>
            <Link
              href="/account/orders"
              className="block px-4 py-2 text-[#E8D5A3] hover:bg-[#3D2010] transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              My Orders
            </Link>
            {userData.profile.role === 'admin' && (
              <>
                <div className="my-1 border-t border-[#8B5E3C]" />
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-[#D4A017] hover:bg-[#3D2010] transition-colors font-semibold"
                  onClick={() => setDropdownOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </>
            )}
            <div className="my-1 border-t border-[#8B5E3C]" />
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-[#C1440E] hover:bg-[#3D2010] transition-colors"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
