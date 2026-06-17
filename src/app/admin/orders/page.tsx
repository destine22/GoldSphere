'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { FileText, ArrowRight, Eye, Trash2, Edit } from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '@/actions/orders';
import { formatPrice } from '@/lib/currency';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchOrders() {
      const data = await getAllOrders();
      setOrders(data);
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const statuses = ['', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  let filteredOrders = [...orders];
  if (searchQuery) {
    filteredOrders = filteredOrders.filter(
      (o) =>
        o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (filterStatus) {
    filteredOrders = filteredOrders.filter((o) => o.status === filterStatus);
  }

  const statusStats = statuses.filter(Boolean).map((status) => {
    const count = orders.filter((o) => o.status === status).length;
    const revenue = orders
      .filter((o) => o.status === status)
      .reduce((sum, o) => sum + o.total_amount, 0);
    return { status, count, revenue };
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCSV = () => {
    const headers = [
      'Order Number',
      'Customer',
      'Email',
      'Items',
      'Total',
      'Status',
      'Date',
    ];
    const csvContent =
      headers.join(',') +
      '\n' +
      orders
        .map((o) =>
          [
            o.order_number,
            o.customer_name,
            o.customer_email,
            o.items.length,
            o.total_amount,
            o.status,
            o.created_at,
          ].join(',')
        )
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateStatus = async (orderId: string, currentOrderNumber: string) => {
    const newStatus = prompt('Enter new status (pending, processing, shipped, delivered, cancelled):');
    if (newStatus) {
      await updateOrderStatus(orderId, newStatus as any);
      const data = await getAllOrders();
      setOrders(data);
    }
  };

  if (loading) {
    return <div className="text-[#F0C040]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040]">
              Orders
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#3D2010] text-[#C8A882] text-sm font-semibold">
              {orders.length}
            </span>
          </div>
          <p className="text-[#C8A882] mt-1">Manage customer orders</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#8B5E3C] text-[#C8A882] hover:bg-[#3D2010] transition-colors"
        >
          <FileText className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {statusStats.map((stat) => (
          <div
            key={stat.status}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2010] border border-[#8B5E3C]"
          >
            <span className="text-sm text-[#C8A882]">
              {stat.status.charAt(0).toUpperCase() + stat.status.slice(1)}:
            </span>
            <span className="text-sm font-semibold text-[#F0C040]">{stat.count}</span>
            <span className="text-xs text-[#C8A882]">({formatPrice(stat.revenue)})</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-[#3D2010] p-4 rounded-xl border border-[#8B5E3C]">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 bg-[#2C1A0E] border border-[#8B5E3C] rounded-lg text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
        />
        <div className="flex gap-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800]'
                  : 'bg-[#2C1A0E] border border-[#8B5E3C] text-[#C8A882] hover:bg-[#D4A017]/10'
              }`}
            >
              {status === '' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={[
          {
            key: 'order_number',
            header: 'Order Number',
            render: (orderNumber: string) => (
              <span className="text-[#F0C040] font-mono font-semibold">{orderNumber}</span>
            ),
          },
          { key: 'customer_name', header: 'Customer Name' },
          { key: 'customer_email', header: 'Customer Email' },
          {
            key: 'items',
            header: 'Items',
            render: (items: any[]) => items.length,
          },
          {
            key: 'total_amount',
            header: 'Total',
            render: (total: number) => formatPrice(total),
          },
          {
            key: 'status',
            header: 'Status',
            render: (status: any) => <OrderStatusBadge status={status} />,
          },
          { key: 'created_at', header: 'Date' },
        ]}
        data={paginatedOrders}
        onRowClick={(order: any) => router.push(`/admin/orders/${order.id}`)}
        actions={[
          {
            label: 'View',
            icon: <Eye className="w-4 h-4" />,
            variant: 'secondary',
            onClick: (order: any) => router.push(`/admin/orders/${order.id}`),
          },
          {
            label: 'Update Status',
            icon: <Edit className="w-4 h-4" />,
            variant: 'primary',
            onClick: (order: any) => handleUpdateStatus(order.id, order.order_number),
          },
        ]}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-[#3D2010] p-4 rounded-xl border border-[#8B5E3C]">
          <div className="text-[#C8A882]">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-[#2C1A0E] border border-[#8B5E3C] text-[#E8D5A3] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A017]/10 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                  page === currentPage
                    ? 'bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800]'
                    : 'bg-[#2C1A0E] border border-[#8B5E3C] text-[#E8D5A3] hover:bg-[#D4A017]/10'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-[#2C1A0E] border border-[#8B5E3C] text-[#E8D5A3] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A017]/10 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
