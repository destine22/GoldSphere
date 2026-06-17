'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BarChart3, Package, Plus, ShoppingBag, Users, Settings, ArrowLeft } from 'lucide-react';
import { useAdminStore } from '@/store/adminStore';

export default function AdminSidebar() {
  const pathname = usePathname();
  const { products, orders } = useAdminStore();

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  const navSections = [
    {
      label: 'MAIN',
      items: [
        { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      label: 'CATALOG',
      items: [
        { href: '/admin/products', label: 'Products', icon: Package, badge: products.length },
        { href: '/admin/products/new', label: 'Add Product', icon: Plus },
      ]
    },
    {
      label: 'SALES',
      items: [
        { href: '/admin/orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount, badgeColor: 'terracotta' },
        { href: '/admin/users', label: 'Customers', icon: Users },
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { href: '/admin/settings', label: 'Settings', icon: Settings },
        { href: '/', label: 'Back to Store', icon: ArrowLeft },
      ]
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-[#1A0800] border-r border-[#8B5E3C] z-30">
      <div className="p-6">
        <Link href="/" className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A017] to-[#C1440E] flex items-center justify-center">
              <span className="text-[#1A0800] font-bold text-lg">GS</span>
            </div>
            <span className="text-2xl font-bold font-[Playfair_Display] text-[#F0C040]">
              GoldSphere
            </span>
          </div>
          <div className="mt-2 px-3 py-1 rounded-full bg-[#C1440E] text-[#F5E8C0] text-xs font-semibold uppercase">
            Admin
          </div>
        </Link>

        <nav className="space-y-6">
          {navSections.map((section) => (
            <div key={section.label}>
              <h3 className="text-[#C8A882] text-xs font-semibold uppercase tracking-wider mb-2 px-2">
                {section.label}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-[rgba(212,160,23,0.2)] to-[rgba(232,120,12,0.15)] border-l-3 border-[#D4A017] text-[#F0C040]'
                          : 'text-[#C8A882] hover:bg-[rgba(212,160,23,0.08)] hover:text-[#E8D5A3]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#D4A017]' : 'text-[#8B5E3C]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          (item as any).badgeColor === 'terracotta'
                            ? 'bg-[#C1440E] text-[#F5E8C0]'
                            : 'bg-[#D4A017] text-[#1A0800]'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#2C1A0E] border-t border-[#8B5E3C]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E8780C] flex items-center justify-center">
            <span className="text-[#1A0800] font-bold">AJ</span>
          </div>
          <div className="flex-1">
            <div className="text-[#F0C040] font-semibold text-sm">Adewale Johnson</div>
            <div className="text-[#C8A882] text-xs">Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
