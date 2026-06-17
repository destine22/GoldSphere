"use client";

import Link from "next/link";
import { XCircle, ShoppingCart, RotateCw, Shield, Leaf } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4" style={{ background: 'linear-gradient(180deg, #2C1A0E 0%, #3D2010 100%)' }}>
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-[#C1440E] mb-4">
          <XCircle className="w-24 h-24 mx-auto" />
        </div>
        <h1 className="text-3xl font-[Playfair_Display] font-bold text-[#F0C040]">
          Order Canceled
        </h1>
        <p className="text-[#C8A882] text-lg">
          Your order has been canceled. No charges were made to your payment method.
        </p>
        <div className="space-y-3">
          <Link href="/cart" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            <ShoppingCart className="w-5 h-5" />
            Back to Cart
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
    </div>
  );
}
