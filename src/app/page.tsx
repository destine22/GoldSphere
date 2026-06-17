'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import HeroBanner from '@/components/HeroBanner'
import ProductCard from '@/components/ProductCard'
import { getFeaturedProductsPublic, getProductsPublic } from '@/actions/products'
import { Leaf, Truck, ShieldCheck, ArrowRight, CheckCircle, Mail } from 'lucide-react'
import type { Product } from '@/types/supabase'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const showWelcome = searchParams.get('welcome') === 'true'
  const showConfirm = searchParams.get('confirm') === 'true'

  useEffect(() => {
    if (showWelcome || showConfirm) {
      // Clear the params after 5 seconds
      const timer = setTimeout(() => {
        router.replace('/')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showWelcome, showConfirm, router])

  useEffect(() => {
    async function fetchData() {
      const [featured, all] = await Promise.all([
        getFeaturedProductsPublic(),
        getProductsPublic()
      ])
      setFeaturedProducts(featured)
      setCategories(['all', ...new Set(all.map(p => p.category))])
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#F0C040] text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Welcome / Confirmation Banner */}
      {(showWelcome || showConfirm) && (
        <div className="pt-24">
          <div className="max-w-3xl mx-auto px-4">
            <div 
              className={`p-6 rounded-xl border ${
                showConfirm 
                  ? 'bg-[#6B3A1F]/20 border-[#D4A017]' 
                  : 'bg-[#6A9A5A]/20 border-[#6A9A5A]'
              }`}
            >
              <div className="flex items-start gap-4">
                {showConfirm ? (
                  <Mail className="w-8 h-8 text-[#D4A017] flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-[#6A9A5A] flex-shrink-0" />
                )}
                <div>
                  <h3 className="text-xl font-bold font-[Playfair_Display]" 
                      style={{ color: showConfirm ? '#F0C040' : '#6A9A5A' }}>
                    {showConfirm 
                      ? 'Please Confirm Your Email' 
                      : 'Welcome to GoldSphere!'}
                  </h3>
                  <p className="text-[#E8D5A3] mt-1">
                    {showConfirm 
                      ? 'We sent a confirmation email. Please check your inbox and click the link to verify your account.' 
                      : 'Your account has been created successfully!'}
                  </p>
                  {showConfirm && (
                    <p className="text-sm text-[#C8A882] mt-2">
                      <strong>TIP:</strong> If you don't see the email, check your spam folder!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <HeroBanner />

      <section className="py-16" style={{ background: 'linear-gradient(180deg, #2C1A0E 0%, #3D2010 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-[Playfair_Display] font-bold mb-3" style={{ color: '#F0C040' }}>
              Shop by Category
            </h2>
            <p style={{ color: '#E8D5A3' }}>
              Explore our wide range of authentic African food products
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.filter(c => c !== 'all').map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="rounded-xl p-6 text-center border-2 transition-all duration-300 group"
                style={{
                  background: 'linear-gradient(135deg, #3D2010, #4A2C15)',
                  borderColor: '#8B5E3C',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#D4A017'
                  e.currentTarget.style.background = 'linear-gradient(135deg, #4A2C15, #5C3820)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#8B5E3C'
                  e.currentTarget.style.background = 'linear-gradient(135deg, #3D2010, #4A2C15)'
                }}
              >
                <div className="text-5xl mb-4 inline-flex items-center justify-center w-20 h-20 rounded-full" style={{ background: 'linear-gradient(135deg, #6B3A1F, #C1440E)' }}>
                  🍽️
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:scale-105 transition-transform" style={{ color: '#F0C040' }}>
                  {category}
                </h3>
                <div className="mt-4 flex justify-center">
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#D4A017' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: 'linear-gradient(180deg, #3D2010 0%, #2C1A0E 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-[Playfair_Display] font-bold mb-3" style={{ color: '#F0C040' }}>
              Featured Products
            </h2>
            <p style={{ color: '#E8D5A3' }}>
              Hand-picked favorites from across Africa
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #C1440E, #D4A017)',
                color: '#1A0800',
              }}
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 border-y" style={{ background: 'linear-gradient(135deg, #6B3A1F, #C1440E, #E8780C)', borderColor: '#D4A017' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: '#F0C040' }}>
                <Leaf className="w-8 h-8" style={{ color: '#1A0800' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#F5E8C0' }}>100% Natural</h3>
              <p style={{ color: '#E8D5A3' }}>No preservatives, no additives</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: '#F0C040' }}>
                <Truck className="w-8 h-8" style={{ color: '#1A0800' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#F5E8C0' }}>Fast Delivery</h3>
              <p style={{ color: '#E8D5A3' }}>Delivered across Europe</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: '#F0C040' }}>
                <ShieldCheck className="w-8 h-8" style={{ color: '#1A0800' }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#F5E8C0' }}>Quality Guaranteed</h3>
              <p style={{ color: '#E8D5A3' }}>Directly from African farmers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t" style={{ background: 'linear-gradient(135deg, #3D2010, #5C3820)', borderColor: '#8B5E3C' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-[Playfair_Display] font-bold mb-4" style={{ color: '#F0C040' }}>
            Stay Connected
          </h2>
          <p className="mb-8" style={{ color: '#E8D5A3' }}>
            Subscribe to our newsletter for the latest African food updates, recipes, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border focus:outline-none"
              style={{
                background: '#2C1A0E',
                borderColor: '#8B5E3C',
                color: '#F5E8C0',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#D4A017'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#8B5E3C'
              }}
            />
            <button
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #D4A017, #E8780C)',
                color: '#1A0800',
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
