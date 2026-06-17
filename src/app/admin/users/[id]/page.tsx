'use client';

export const dynamic = 'force-dynamic';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { ArrowLeft, Calendar, ShoppingBag, Ban, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminUserDetailPage({ params }: UserDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { users, orders, updateUserStatus, deleteUser } = useAdminStore();
  const user = users.find(u => u.id === id);

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="text-[#C8A882] text-lg mb-4">User not found</div>
        <button
          onClick={() => router.push('/admin/users')}
          className="text-[#D4A017] font-semibold hover:underline"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const userOrders = orders.filter(o => o.customerId === user.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/users')}
            className="p-2 hover:bg-[#3D2010] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#F0C040]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040]">
              {user.name}
            </h1>
            <p className="text-[#C8A882] mt-1">{user.email}</p>
          </div>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${
          user.status === 'active'
            ? 'bg-[#6A9A5A]/20 text-[#8BC87A] border-[#6A9A5A]'
            : 'bg-[#C1440E]/20 text-[#E8638A] border-[#C1440E]'
        }`}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="rounded-xl shadow-lg p-8 border border-[#8B5E3C] text-center" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E8780C] mx-auto mb-6 flex items-center justify-center">
              <span className="text-[#1A0800] font-bold text-4xl">{user.avatar}</span>
            </div>
            <h2 className="text-2xl font-bold text-[#F0C040] mb-2">{user.name}</h2>
            <p className="text-[#C8A882] mb-4">{user.email}</p>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              user.role === 'admin'
                ? 'bg-[#C1440E]/20 text-[#E8780C] border border-[#C1440E]'
                : 'bg-[#8B5E3C]/20 text-[#C8A882] border border-[#8B5E3C]'
            }`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
            <div className="mt-4 text-[#E8D5A3] text-sm">
              {user.country}
            </div>
          </div>

          {/* Account Actions */}
          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
            <h3 className="text-lg font-bold text-[#F0C040] mb-6">Account Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => {
                  updateUserStatus(user.id);
                  alert('User status updated!');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] font-bold hover:opacity-90 transition-opacity"
              >
                <Ban className="w-5 h-5" />
                {user.status === 'active' ? 'Ban User' : 'Unban User'}
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this user?')) {
                    deleteUser(user.id);
                    router.push('/admin/users');
                  }
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#C1440E]/20 text-[#E8638A] border border-[#C1440E] font-bold hover:bg-[#C1440E]/30 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C] text-center" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
              <ShoppingBag className="w-6 h-6 text-[#D4A017] mx-auto mb-2" />
              <p className="text-2xl font-bold font-[Playfair_Display] text-[#F0C040]">{user.totalOrders}</p>
              <p className="text-sm text-[#C8A882]">Total Orders</p>
            </div>
            <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C] text-center" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
              <p className="text-2xl font-bold font-[Playfair_Display] text-[#F0C040]">{formatPrice(user.totalSpent)}</p>
              <p className="text-sm text-[#C8A882]">Total Spent</p>
            </div>
            <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C] text-center" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
              <Calendar className="w-6 h-6 text-[#D4A017] mx-auto mb-2" />
              <p className="text-sm text-[#E8D5A3]">{user.joinDate}</p>
              <p className="text-sm text-[#C8A882]">Member Since</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
            <h3 className="text-xl font-bold text-[#F0C040] mb-6">Recent Orders</h3>
            {userOrders.length === 0 ? (
              <div className="text-center py-8 text-[#C8A882]">
                No orders yet
              </div>
            ) : (
              <div className="space-y-3">
                {userOrders.slice(0, 5).map(order => (
                  <div
                    key={order.id}
                    onClick={() => router.push(`/admin/orders/${order.id}`)}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#2C1A0E] border border-[#8B5E3C] cursor-pointer hover:bg-[#D4A017]/10 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-[#F0C040]">{order.orderNumber}</p>
                      <p className="text-sm text-[#C8A882]">{order.createdAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#F0C040]">{formatPrice(order.total)}</p>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
