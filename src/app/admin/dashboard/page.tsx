'use client';

import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import { getAdminStats } from '@/data/adminData';
import StatCard from '@/components/admin/StatCard';
import dynamicImport from 'next/dynamic';
const RevenueChart = dynamicImport(
  () => import('@/components/admin/RevenueChart'),
  { ssr: false, loading: () => <div style={{height: 280, background: '#2C1A0E', borderRadius: 8}} /> }
);
import DataTable from '@/components/admin/DataTable';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { ShoppingBag, Package, Users, DollarSign, Plus, FileText, ChevronRight, Settings, UserPlus } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

export default function AdminDashboardPage() {
  const { products, orders } = useAdminStore();
  const router = useRouter();
  const stats = getAdminStats();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const orderStatusBreakdown = [
    { status: 'Pending', count: stats.pendingOrders, color: '#D4A017' },
    { status: 'Processing', count: stats.processingOrders, color: '#E8780C' },
    { status: 'Shipped', count: stats.shippedOrders, color: '#6A9A5A' },
    { status: 'Delivered', count: stats.deliveredOrders, color: '#8BC34A' },
    { status: 'Cancelled', count: stats.cancelledOrders, color: '#C1440E' },
  ];

  const maxCount = Math.max(...orderStatusBreakdown.map(item => item.count));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040]">Dashboard</h1>
          <p className="text-[#C8A882] mt-1">Welcome back, Admin. Here is what is happening today.</p>
        </div>
        <div className="text-[#E8D5A3]">{today}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatPrice(stats.totalRevenue)}
          icon={<DollarSign className="w-6 h-6" />}
          change="+8.2%"
          changeType="positive"
          color="gold"
          description="from last month"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<ShoppingBag className="w-6 h-6" />}
          change="+12%"
          changeType="positive"
          color="orange"
          description="from last month"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalUsers}
          icon={<Users className="w-6 h-6" />}
          change="+5.1%"
          changeType="positive"
          color="green"
          description="from last month"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package className="w-6 h-6" />}
          change="+2"
          changeType="positive"
          color="gold"
          description="this week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart data={stats.revenueByMonth} />
        </div>
        <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15 )' }}>
          <h3 className="text-lg font-bold font-[Playfair_Display] text-[#F0C040] mb-6">Orders by Status</h3>
          <div className="space-y-4">
            {orderStatusBreakdown.map((item) => {
              const width = maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%';
              return (
                <div key={item.status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#E8D5A3] font-medium">{item.status}</span>
                    <span className="text-[#F0C040] font-semibold">{item.count}</span>
                  </div>
                  <div className="h-2 bg-[#2C1A0E] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width, backgroundColor: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-[Playfair_Display] text-[#F0C040]">Recent Orders</h2>
          </div>
          <DataTable
            columns={[
              { key: 'orderNumber', header: 'Order Number' },
              { key: 'customerName', header: 'Customer' },
              {
                key: 'total',
                header: 'Total',
                render: (total: number) => formatPrice(total),
              },
              {
                key: 'status',
                header: 'Status',
                render: (status: any) => <OrderStatusBadge status={status} />,
              },
              { key: 'createdAt', header: 'Date' },
            ]}
            data={stats.recentOrders}
            onRowClick={(order: any) => router.push(`/admin/orders/${order.id}`)}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15 )' }}>
            <h3 className="text-lg font-bold font-[Playfair_Display] text-[#F0C040] mb-6">Top Selling Products</h3>
            <div className="space-y-4">
              {stats.topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-[#D4A017] text-[#1A0800]' : 'bg-[#2C1A0E] text-[#C8A882]'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${index === 0 ? 'text-[#F0C040]' : 'text-[#E8D5A3]'}`}>{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-[#2C1A0E] rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-[#D4A017] to-[#E8780C]"
                          style={{ width: `${(product.unitsSold / Math.max(...stats.topProducts.map(p => p.unitsSold))) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#C8A882]">{product.unitsSold} sold</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15 )' }}>
            <h3 className="text-lg font-bold font-[Playfair_Display] text-[#F0C040] mb-6">Recent Users</h3>
            <div className="space-y-4">
              {stats.recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2C1A0E] flex items-center justify-center font-bold text-[#F0C040] text-sm">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#E8D5A3] truncate">{user.name}</p>
                    <p className="text-xs text-[#C8A882] truncate">{user.email}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    user.status === 'active' ? 'bg-[#6A9A5A]/20 text-[#6A9A5A]' : 'bg-[#C1440E]/20 text-[#C1440E]'
                  }`}>
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold font-[Playfair_Display] text-[#F0C040] mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Link href="/admin/products/new" className="rounded-xl p-6 border border-[#8B5E3C] hover:border-[#D4A017] hover:bg-[#4A2C15] transition-all duration-300" style={{ background: '#3D2010' }}>
            <div className="w-12 h-12 rounded-full bg-[#D4A017]/20 flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-[#D4A017]" />
            </div>
            <p className="font-semibold text-[#F0C040] mb-1">Add New Product</p>
            <p className="text-xs text-[#C8A882]">Create a new listing</p>
          </Link>
          <Link href="/admin/orders" className="rounded-xl p-6 border border-[#8B5E3C] hover:border-[#D4A017] hover:bg-[#4A2C15] transition-all duration-300" style={{ background: '#3D2010' }}>
            <div className="w-12 h-12 rounded-full bg-[#E8780C]/20 flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-[#E8780C]" />
            </div>
            <p className="font-semibold text-[#F0C040] mb-1">View Orders</p>
            <p className="text-xs text-[#C8A882]">Manage all orders</p>
          </Link>
          <Link href="/admin/users" className="rounded-xl p-6 border border-[#8B5E3C] hover:border-[#D4A017] hover:bg-[#4A2C15] transition-all duration-300" style={{ background: '#3D2010' }}>
            <div className="w-12 h-12 rounded-full bg-[#6A9A5A]/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#6A9A5A]" />
            </div>
            <p className="font-semibold text-[#F0C040] mb-1">Manage Users</p>
            <p className="text-xs text-[#C8A882]">View and edit users</p>
          </Link>
          <Link href="/admin/users" className="rounded-xl p-6 border border-[#8B5E3C] hover:border-[#D4A017] hover:bg-[#4A2C15] transition-all duration-300" style={{ background: '#3D2010' }}>
            <div className="w-12 h-12 rounded-full bg-[#8B5E3C]/20 flex items-center justify-center mb-4">
              <UserPlus className="w-6 h-6 text-[#C8A882]" />
            </div>
            <p className="font-semibold text-[#F0C040] mb-1">New User</p>
            <p className="text-xs text-[#C8A882]">Add a new user</p>
          </Link>
          <Link href="/admin/settings" className="rounded-xl p-6 border border-[#8B5E3C] hover:border-[#D4A017] hover:bg-[#4A2C15] transition-all duration-300" style={{ background: '#3D2010' }}>
            <div className="w-12 h-12 rounded-full bg-[#C1440E]/20 flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-[#C1440E]" />
            </div>
            <p className="font-semibold text-[#F0C040] mb-1">Settings</p>
            <p className="text-xs text-[#C8A882]">Configure admin panel</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
