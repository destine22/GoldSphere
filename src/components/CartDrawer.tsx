'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useCartStore, useTotalItems, useTotalPrice } from '@/store/cartStore'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingCart } from 'lucide-react'
import { formatPrice } from '@/lib/currency'

export default function CartDrawer() {
  const items = useCartStore((state) => state.items)
  const totalPrice = useTotalPrice()
  const totalItems = useTotalItems()
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:max-w-lg bg-[#2C1A0E] border-l border-[#8B5E3C]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold text-[#F0C040]">
              Your Cart
              {totalItems > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#D4A017] text-[#1A0800] text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </SheetTitle>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-[#3D2010] rounded-full transition-colors text-[#E8D5A3]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto max-h-[calc(100vh-250px)]">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-[#8B5E3C] mb-4" />
              <p className="text-[#C8A882] mb-4">Your cart is empty</p>
              <Link
                href="/products"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
              <div key={item.product.id} className="flex gap-4">
                <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 border border-[#8B5E3C]">
                  <Image
                    src={item.product.image_url || '/placeholder.png'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.slug}`}
                    onClick={closeCart}
                    className="font-medium text-[#E8D5A3] hover:text-[#D4A017] transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-[#F0C040] font-semibold mt-1">
                    {formatPrice(item.product.price)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-[#8B5E3C] rounded-lg">
                      <button
                        onClick={async () => await updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-[#3D2010] transition-colors text-[#E8D5A3]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 border-x border-[#8B5E3C] text-sm text-[#E8D5A3]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={async () => await updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-[#3D2010] transition-colors text-[#E8D5A3]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={async () => await removeItem(item.product.id)}
                      className="ml-auto text-[#C1440E] text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#8B5E3C]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#C8A882]">Subtotal</span>
              <span className="text-lg font-semibold text-[#F0C040]">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="space-y-3">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity block text-center"
              >
                Checkout
              </Link>
              <Link
                href="/products"
                onClick={closeCart}
                className="w-full block text-center text-[#C8A882] hover:text-[#D4A017] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
