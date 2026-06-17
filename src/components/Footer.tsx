import Link from 'next/link'
import { Heart, Star, Link as LinkIcon, X, Mail, Phone, MapPin } from 'lucide-react'
import { categories } from '@/data/products'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#FAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center">
                <span className="text-white font-bold">●</span>
              </div>
              <span className="text-2xl font-bold font-[Playfair_Display] text-white">
                GoldSphere
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Premium African foods delivered to your door. Authentic, fresh, and sourced directly from African farmers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-[#C9A84C] transition-colors">
                <Heart className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#C9A84C] transition-colors">
                <X className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#C9A84C] transition-colors">
                <Star className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="text-gray-400 hover:text-[#C9A84C] transition-colors text-xs">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 5).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4" />
                hello@goldsphere.com
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4" />
                +31 20 000 0000
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4" />
                Amsterdam, Netherlands
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GoldSphere. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Made with love for Africa
          </p>
        </div>
      </div>
    </footer>
  )
}
