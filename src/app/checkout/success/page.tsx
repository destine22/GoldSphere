"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, ShoppingBag, RotateCw, Shield, Leaf } from "lucide-react";
import { createOrderFromStripeSession } from "@/actions/checkout";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutSuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const handleSuccess = async () => {
      if (searchParams.session_id) {
        try {
          const order = await createOrderFromStripeSession(searchParams.session_id);
          setOrderId(order.id);
          await clearCart();
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    handleSuccess();
  }, [searchParams.session_id, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: 'linear-gradient(180deg, #2C1A0E 0%, #3D2010 100%)' }}>
      <div className="max-w-md w-full text-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-6">
            <RotateCw className="w-24 h-24 text-[#D4A017] animate-spin" />
            <h1 className="text-2xl font-[Playfair_Display] font-bold text-[#F0C040]">
              Processing your order...
            </h1>
          </div>
        ) : error ? (
          <div className="space-y-6">
            <div className="text-[#C1440E] mb-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-[#C1440E]/20 flex items-center justify-center">
                <Shield className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-3xl font-[Playfair_Display] font-bold text-[#F0C040]">
              Something went wrong
            </h1>
            <p className="text-[#C8A882] text-lg">{error}</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-[#6A9A5A] mb-4">
              <CheckCircle className="w-24 h-24 mx-auto" />
            </div>
            <h1 className="text-3xl font-[Playfair_Display] font-bold text-[#F0C040]">
              Order Confirmed!
            </h1>
            <p className="text-[#C8A882] text-lg">
              Thank you for your purchase! We're preparing your order for shipment.
            </p>
            {orderId && (
              <p className="text-[#D4A017] font-semibold">Order ID: {orderId}</p>
            )}
            <div className="space-y-3">
              <Link href="/account/orders" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                <ShoppingBag className="w-5 h-5" />
                View My Orders
              </Link>
              <br />
              <Link href="/" className="text-[#C8A882] hover:text-[#D4A017] transition-colors">
                Continue Shopping
              </Link>
            </div>
            <div className="pt-6 border-t border-[#8B5E3C] grid grid-cols-3 gap-4 text-center text-sm text-[#C8A882]">
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-6 h-6 text-[#D4A017]" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <RotateCw className="w-6 h-6 text-[#D4A017]" />
                <span>Free Returns</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Leaf className="w-6 h-6 text-[#D4A017]" />
                <span>100% Natural</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
