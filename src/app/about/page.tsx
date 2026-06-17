import Link from 'next/link'
import Image from 'next/image'
import { Users, CheckCircle2, Leaf, Heart, Globe, Truck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
          alt="About GoldSphere"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-[Playfair_Display] font-bold mb-6">
            About GoldSphere
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Bringing authentic African flavors directly from farmers to your
            table
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-[Playfair_Display] font-bold text-[#1A1A1A] mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  GoldSphere was born from a simple idea: everyone deserves
                  access to authentic, high-quality African ingredients, no
                  matter where they are in the world.
                </p>
                <p>
                  Founded by a team passionate about African cuisine and
                  sustainable farming, we work directly with smallholder farmers
                  across the continent to source the freshest, most flavorful
                  products.
                </p>
                <p>
                  Our mission is to celebrate Africa's rich culinary heritage
                  while supporting local communities and promoting ethical,
                  sustainable practices.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80"
                alt="African Market"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How We Source */}
      <section className="py-20 bg-[#3B5E45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-[Playfair_Display] font-bold text-white mb-12 text-center">
            How We Source
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#C9A84C] rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#1A1A1A]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Partner with Farmers
              </h3>
              <p className="text-gray-200">
                We build direct, long-term relationships with smallholder
                farmers, ensuring fair prices and sustainable practices.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#C9A84C] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#1A1A1A]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Quality Control
              </h3>
              <p className="text-gray-200">
                Every product is carefully inspected to meet our high standards
                of quality, freshness, and authenticity.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-[#C9A84C] rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-[#1A1A1A]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Delivered to You
              </h3>
              <p className="text-gray-200">
                We carefully package and deliver your order, ensuring it arrives
                fresh and in perfect condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-[Playfair_Display] font-bold text-[#1A1A1A] mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Authenticity
              </h3>
              <p className="text-gray-600">
                We're committed to bringing you genuine African flavors and
                traditions.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Quality
              </h3>
              <p className="text-gray-600">
                We never compromise on quality—only the best products make it to
                your table.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Community
              </h3>
              <p className="text-gray-600">
                We support African communities through fair trade and sustainable
                practices.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-6 h-6 text-[#C9A84C]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-4">
                Sustainability
              </h3>
              <p className="text-gray-600">
                We prioritize eco-friendly practices and sustainable sourcing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-[Playfair_Display] font-bold text-white mb-6">
            Ready to Explore?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Discover our wide range of authentic African products and start
            cooking today!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#1A1A1A] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#A8872D] transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  )
}
