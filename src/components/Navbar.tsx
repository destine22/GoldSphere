'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore, useTotalItems } from '@/store/cartStore'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import NavbarAuthSection from './NavbarAuthSection'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const totalItems = useTotalItems()
  const openCart = useCartStore((state) => state.openCart)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[rgba(44,26,14,0.98)] backdrop-blur-xl border-[rgba(212,160,23,0.3)]'
          : 'bg-[rgba(28,16,6,0.92)] backdrop-blur-xl border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A017] to-[#E8638A] flex items-center justify-center">
            <span className="text-[#1A0800] font-bold">●</span>
          </div>
          <span
            className="text-2xl font-bold font-[Playfair_Display] bg-gradient-to-r from-[#F0C040] to-[#E8638A] bg-clip-text text-transparent"
          >
            GoldSphere
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`transition-all duration-300 ${
              isActive('/')
                ? 'text-[#F0C040] underline underline-offset-4 decoration-[#D4A017]'
                : 'text-[#E8D5A3] hover:text-[#F0C040]'
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`transition-all duration-300 ${
              isActive('/products')
                ? 'text-[#F0C040] underline underline-offset-4 decoration-[#D4A017]'
                : 'text-[#E8D5A3] hover:text-[#F0C040]'
            }`}
          >
            Products
          </Link>
          <Link
            href="/about"
            className={`transition-all duration-300 ${
              isActive('/about')
                ? 'text-[#F0C040] underline underline-offset-4 decoration-[#D4A017]'
                : 'text-[#E8D5A3] hover:text-[#F0C040]'
            }`}
          >
            About
          </Link>

          <button
            onClick={openCart}
            className="relative p-2 transition-all duration-300"
          >
            <ShoppingCart
              className="w-6 h-6 text-[#F0C040]"
            />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C2406E] text-[#F5E8C0] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <NavbarAuthSection />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <NavbarAuthSection />
          <button
            onClick={openCart}
            className="relative p-2 transition-all duration-300"
          >
            <ShoppingCart
              className="w-6 h-6 text-[#F0C040]"
            />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C2406E] text-[#F5E8C0] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            {mobileMenuOpen ? (
              <X
                className="w-6 h-6 text-[#F0C040]"
              />
            ) : (
              <Menu
                className="w-6 h-6 text-[#F0C040]"
              />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#2C1A0E] border-b border-[#8B5E3C]">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/"
              className={`block py-2 transition-all duration-300 ${
                isActive('/')
                  ? 'text-[#F0C040]'
                  : 'text-[#E8D5A3] hover:text-[#F0C040]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block py-2 transition-all duration-300 ${
                isActive('/products')
                  ? 'text-[#F0C040]'
                  : 'text-[#E8D5A3] hover:text-[#F0C040]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`block py-2 transition-all duration-300 ${
                isActive('/about')
                  ? 'text-[#F0C040]'
                  : 'text-[#E8D5A3] hover:text-[#F0C040]'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
