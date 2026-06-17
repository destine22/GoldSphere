'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

export default function AdminHeader() {
  const pathname = usePathname();
  const { setSearchQuery } = useAdminStore();

  const getPageTitle = () => {
    const path = pathname.split('/').pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="fixed left-[260px] top-0 right-0 h-[64px] bg-[rgba(26,8,0,0.95)] backdrop-blur border-b border-[#8B5E3C] z-30">
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left: Page Title */}
        <div>
          <h1 className="text-2xl font-bold font-[Playfair_Display] text-[#F0C040]">
            {getPageTitle()}
          </h1>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="w-5 h-5 text-[#D4A017] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#3D2010] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
            />
          </div>
        </div>

        {/* Right: Notifications & Avatar */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-[#3D2010] transition-colors relative">
            <Bell className="w-6 h-6 text-[#F0C040]" />
            <span className="absolute top-1 right-1 w-5 h-5 bg-[#C1440E] rounded-full text-[#F5E8C0] text-xs font-bold flex items-center justify-center">3</span>
          </button>

          {/* Admin Avatar */}
          <div className="flex items-center gap-3 pl-4 border-l border-[#8B5E3C]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E8780C] flex items-center justify-center">
              <span className="text-[#1A0800] font-bold">GS</span>
            </div>
            <ChevronDown className="w-4 h-4 text-[#F0C040]" />
          </div>
        </div>
      </div>
    </header>
  );
}
