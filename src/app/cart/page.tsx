'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Minus, Plus, X, ShoppingCart, Shield, RotateCw, Leaf } from 'lucide-react'
import { useCartStore, useTotalItems, useTotalPrice } from '@/store/cartStore'
import { formatPrice } from '@/lib/currency'

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const totalPrice = useTotalPrice()
  const totalItems = useTotalItems()

  const handleCheckout = () => {
    router.push('/checkout');
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24" style={{ background: 'linear-gradient(180deg, #2C1A0E 0%, #3D2010 100%)', minHeight: '100vh' }}>
      <h1 className="text-3xl font-[Playfair_Display] font-bold mb-2 text-[#F0C040]">
        Your Cart
        {totalItems > 0 && (
          <span className="ml-2 text-lg font-normal text-[#C8A882]">
            ({totalItems} items)
          </span>
        )}
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 mx-auto text-[#8B5E3C] mb-6" />
          <h2 className="text-2xl font-semibold text-[#E8D5A3] mb-4">
            Your cart is empty
          </h2>
          <p className="text-[#C8A882] mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Start
            exploring our authentic African products!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="rounded-xl border border-[#8B5E3C] p-6 flex gap-6 items-start"
                style={{ background: 'linear-gradient(135deg, #3D2010, #4A2C15)' }}
              >
                <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 border border-[#8B5E3C]">
                  <Image
                    src={item.product.image_url || '/placeholder.png'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-xl font-semibold text-[#F0C040] hover:text-[#D4A017] transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <button
                      onClick={async () => await removeItem(item.product.id)}
                      className="text-[#8B5E3C] hover:text-[#C1440E] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-[#C8A882] text-sm mb-2">{item.product.origin_country}</p>
                  <p className="text-[#F0C040] font-bold text-lg mb-4">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center border border-[#8B5E3C] rounded-lg">
                      <button
                        onClick={async () => await updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-4 py-2 hover:bg-[#2C1A0E] transition-colors text-[#E8D5A3]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-[#8B5E3C] text-lg font-medium text-[#E8D5A3]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={async () => await updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-4 py-2 hover:bg-[#2C1A0E] transition-colors text-[#E8D5A3]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xl font-bold text-[#F0C040]">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={async () => await clearCart()}
              className="text-[#C1440E] hover:text-red-600 font-medium text-sm"
            >
              Clear Cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-xl border border-[#8B5E3C] p-8 sticky top-24" style={{ background: 'linear-gradient(135deg, #3D2010, #4A2C15)' }}>
              <h2 className="text-2xl font-semibold mb-8 text-[#F0C040]">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-[#C8A882]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#F0C040]">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#C8A882]">
                  <span>Shipping</span>
                  <span className="text-[#8B5E3C]">Calculated at checkout</span>
                </div>
                <div className="border-t border-[#8B5E3C] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-[#E8D5A3]">Total</span>
                    <span className="text-2xl font-bold text-[#F0C040]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-300 mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/products"
                className="w-full block text-center text-[#C8A882] hover:text-[#D4A017] font-medium transition-colors"
              >
                Continue Shopping
              </Link>

              <div className="border-t border-[#8B5E3C] mt-8 pt-8 grid grid-cols-3 gap-4 text-center text-sm text-[#C8A882]">
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
        </div>
      )}
    </div>
  )
}
