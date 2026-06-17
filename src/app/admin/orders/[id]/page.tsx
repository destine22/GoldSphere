'use client';

export const dynamic = 'force-dynamic';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { ArrowLeft, User, MapPin, Calendar, Package } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminOrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { orders, updateOrderStatus } = useAdminStore();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-12">
        <div className="text-[#C8A882] text-lg mb-4">Order not found</div>
        <button
          onClick={() => router.push('/admin/orders')}
          className="text-[#D4A017] font-semibold hover:underline"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/orders')}
            className="p-2 hover:bg-[#3D2010] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#F0C040]" />
          </button>
          <div>
            <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040]">
              Order {order.orderNumber}
            </h1>
            <p className="text-[#C8A882] mt-1">Placed on {order.createdAt}</p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F0C040]">Order Items</h2>
              <Package className="w-5 h-5 text-[#D4A017]" />
            </div>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-[#2C1A0E] border border-[#8B5E3C]">
                  <div>
                    <h3 className="font-semibold text-[#F0C040]">{item.name}</h3>
                    <p className="text-[#C8A882] text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#F0C040]">{formatPrice(item.price)}</p>
                    <p className="text-[#C8A882] text-sm">Subtotal: {formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-[#8B5E3C] pt-4">
              <div className="flex justify-between text-lg font-bold text-[#F0C040]">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F0C040]">Customer Info</h2>
              <User className="w-5 h-5 text-[#D4A017]" />
            </div>
            <div className="space-y-3">
              <p className="text-[#F0C040] font-semibold">{order.customerName}</p>
              <p className="text-[#E8D5A3]">{order.customerEmail}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F0C040]">Shipping Address</h2>
              <MapPin className="w-5 h-5 text-[#D4A017]" />
            </div>
            <div className="space-y-1 text-[#E8D5A3]">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
              <p>{order.shippingAddress.zip}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
            <h2 className="text-xl font-bold text-[#F0C040] mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-[#C8A882]">
                <span>Order ID:</span>
                <span className="text-[#E8D5A3]">{order.id}</span>
              </div>
              <div className="flex items-center gap-2 text-[#C8A882]">
                <Calendar className="w-4 h-4" />
                <span>Placed: {order.createdAt}</span>
              </div>
              <div className="flex items-center gap-2 text-[#C8A882]">
                <Calendar className="w-4 h-4" />
                <span>Updated: {order.updatedAt}</span>
              </div>
              <div className="flex justify-between text-[#C8A882]">
                <span>Payment:</span>
                <span className="text-[#E8D5A3]">{order.paymentMethod}</span>
              </div>
              <div className="border-t border-[#8B5E3C] pt-4 flex justify-between font-bold text-[#F0C040] text-xl">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Update Status */}
          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
            <h2 className="text-xl font-bold text-[#F0C040] mb-6">Update Status</h2>
            <select
              value={order.status}
              onChange={(e) => {
                updateOrderStatus(order.id, e.target.value as any);
                alert('Order status updated!');
              }}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Order Notes */}
          <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15)' }}>
            <h2 className="text-xl font-bold text-[#F0C040] mb-6">Order Notes</h2>
            <p className="text-[#E8D5A3]">{order.notes || 'No notes'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
