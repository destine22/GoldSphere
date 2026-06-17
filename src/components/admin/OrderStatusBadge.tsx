import { Circle, Loader2, Truck, CheckCircle, XCircle } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusConfig = {
    pending: {
      bg: 'bg-[rgba(212,160,23,0.2)]',
      text: 'text-[#F0C040]',
      border: 'border-[#D4A017]',
      icon: Circle,
    },
    processing: {
      bg: 'bg-[rgba(232,120,12,0.2)]',
      text: 'text-[#E8780C]',
      border: 'border-[#E8780C]',
      icon: Loader2,
    },
    shipped: {
      bg: 'bg-[rgba(106,154,90,0.2)]',
      text: 'text-[#6A9A5A]',
      border: 'border-[#6A9A5A]',
      icon: Truck,
    },
    delivered: {
      bg: 'bg-[rgba(106,154,90,0.3)]',
      text: 'text-[#8BC34A]',
      border: 'border-[#6A9A5A]',
      icon: CheckCircle,
    },
    cancelled: {
      bg: 'bg-[rgba(193,68,14,0.2)]',
      text: 'text-[#E8638A]',
      border: 'border-[#C1440E]',
      icon: XCircle,
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const labels = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${config.bg} ${config.text} ${config.border}`}>
      <Icon className={`w-3 h-3 ${status === 'processing' ? 'animate-spin' : ''}`} />
      {labels[status]}
    </span>
  );
}
