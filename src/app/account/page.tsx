'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUser, updateProfile } from '@/actions/auth';
import { getOrdersByUser } from '@/actions/orders';
import { useCartStore } from '@/store/cartStore';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { formatPrice } from '@/lib/currency';

export default function AccountPage() {
  const [userData, setUserData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: '', avatar_url: '', country: '' });
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const setAuthenticated = useCartStore((state) => state.setAuthenticated);

  useEffect(() => {
    async function loadData() {
      const data = await getUser();
      setUserData(data);
      if (data.user && data.profile) {
        setAuthenticated(true, data.user.id);
        const userOrders = await getOrdersByUser(data.user.id);
        setOrders(userOrders);
        setEditForm({
          full_name: data.profile.full_name || '',
          avatar_url: data.profile.avatar_url || '',
          country: data.profile.country || '',
        });
      }
      setLoading(false);
    }
    loadData();
  }, [setAuthenticated]);

  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append('full_name', editForm.full_name);
    formData.append('avatar_url', editForm.avatar_url);
    formData.append('country', editForm.country);
    await updateProfile(formData);
    setIsEditing(false);
    setUserData(await getUser());
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(180deg, #1A0800 0%, #2C1A0E 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-[#3D2010] rounded" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="h-80 bg-[#3D2010] rounded-xl border border-[#8B5E3C]" />
              </div>
              <div className="md:col-span-2">
                <div className="h-96 bg-[#3D2010] rounded-xl border border-[#8B5E3C]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(180deg, #1A0800 0%, #2C1A0E 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-[Playfair_Display] font-bold text-[#F0C040] mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="rounded-xl p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010, #4A2C15)' }}>
              <div className="flex flex-col items-center text-center mb-6">
                {userData?.profile?.avatar_url ? (
                  <img src={userData.profile.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-[#D4A017] mb-4" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E8780C] flex items-center justify-center border-2 border-[#D4A017] mb-4">
                    <span className="text-[#1A0800] font-bold text-2xl">{getInitials(userData?.profile?.full_name)}</span>
                  </div>
                )}
                <h2 className="text-xl font-[Playfair_Display] font-bold text-[#F0C040]">
                  {userData?.profile?.full_name || userData?.user?.email}
                </h2>
                <p className="text-[#C8A882] text-sm">{userData?.user?.email}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B5E3C]">Member since</span>
                  <span className="text-[#E8D5A3]">{new Date(userData?.profile?.created_at).toLocaleDateString()}</span>
                </div>
                {userData?.profile?.country && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B5E3C]">Country</span>
                    <span className="text-[#E8D5A3]">{userData.profile.country}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B5E3C]">Role</span>
                  <span className="text-[#D4A017] font-semibold capitalize">{userData?.profile?.role}</span>
                </div>
              </div>

              {userData?.profile?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="w-full py-2 mb-3 rounded-lg bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] font-bold text-center hover:opacity-90 transition-opacity"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full py-2 rounded-lg border border-[#D4A017] text-[#D4A017] font-semibold hover:bg-[#D4A017]/10 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>

              {isEditing && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#F0C040] mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#F0C040] mb-2">Avatar URL</label>
                    <input
                      type="text"
                      value={editForm.avatar_url}
                      onChange={(e) => setEditForm({ ...editForm, avatar_url: e.target.value })}
                      className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#F0C040] mb-2">Country</label>
                    <input
                      type="text"
                      value={editForm.country}
                      onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                      className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="w-full py-3 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Orders */}
          <div className="md:col-span-2">
            <div className="rounded-xl p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010, #4A2C15)' }}>
              <h2 className="text-2xl font-[Playfair_Display] font-bold text-[#F0C040] mb-6">
                My Orders
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#C8A882] mb-4">You haven't placed any orders yet.</p>
                  <Link
                    href="/products"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-lg border border-[#8B5E3C] overflow-hidden">
                      <button
                        onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left bg-[#2C1A0E] hover:bg-[#3D2010] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-sm font-mono text-[#D4A017]">{order.order_number}</div>
                          <OrderStatusBadge status={order.status} />
                          <div className="text-xs text-[#C8A882]">{new Date(order.created_at).toLocaleDateString()}</div>
                          <div className="text-xs text-[#C8A882]">{order.items?.length || 0} items</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-lg font-bold text-[#F0C040]">{formatPrice(order.total_amount)}</span>
                          <span className="text-[#8B5E3C]">
                            {expandedOrderId === order.id ? '▼' : '▶'}
                          </span>
                        </div>
                      </button>
                      {expandedOrderId === order.id && (
                        <div className="px-6 py-4 bg-[#2C1A0E]/50 border-t border-[#8B5E3C]">
                          <div className="space-y-2">
                            {order.items?.map((item: any) => (
                              <div key={item.id} className="flex justify-between items-center py-2 border-b border-[#3D2010] last:border-0">
                                <div>
                                  <div className="text-[#E8D5A3]">{item.product_name}</div>
                                  <div className="text-xs text-[#C8A882]">Qty: {item.quantity}</div>
                                </div>
                                <div className="text-[#F0C040] font-semibold">
                                  {formatPrice(item.quantity * item.unit_price)}
                                </div>
                              </div>
                            ))}
                            {order.shipping_address && (
                              <div className="mt-4 pt-4 border-t border-[#3D2010]">
                                <div className="text-xs text-[#8B5E3C] mb-2">Shipping Address</div>
                                <div className="text-[#E8D5A3] text-sm">
                                  {order.shipping_address.street}, {order.shipping_address.city}, {order.shipping_address.country} {order.shipping_address.zip}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
