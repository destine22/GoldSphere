import Link from 'next/link'
import { Check } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Main gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #3D2010 0%, #6B3A1F 25%, #C1440E 50%, #E8780C 70%, #D4A017 100%)',
        }}
      />
      {/* Radial gradient overlays for depth */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 50%, rgba(194,64,110,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(232,120,12,0.3) 0%, transparent 60%)',
        }}
      />
      {/* Floating decorative circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-15"
          style={{ backgroundColor: '#C2406E' }}
        />
        <div
          className="absolute top-1/3 -right-20 w-64 h-64 rounded-full opacity-20"
          style={{ backgroundColor: '#D4A017' }}
        />
        <div
          className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full opacity-10"
          style={{ backgroundColor: '#E8638A' }}
        />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <div>
          <span className="inline-block text-[#F0C040] text-sm uppercase tracking-widest font-semibold mb-4">
            Premium African Foods
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-[Playfair_Display] font-bold text-[#F5E8C0] mb-4">
            Taste the Roots <br />
            <span className="bg-gradient-to-r from-[#F0C040] to-[#E8638A] bg-clip-text text-transparent">
              of Africa
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#E8D5A3] max-w-2xl mb-8">
            Sourced directly from African farmers. 100% natural, authentic, and delivered fresh.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/products"
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-[#1A0800]"
              style={{
                background: 'linear-gradient(135deg, #D4A017, #E8780C)',
              }}
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 border-2 border-[#F5E8C0] text-[#F5E8C0] hover:bg-[rgba(245,232,192,0.15)]"
            >
              Our Story
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg border"
              style={{
                background: 'rgba(61,32,16,0.8)',
                borderColor: '#8B5E3C',
              }}
            >
              <Check className="w-5 h-5 text-[#F0C040]" />
              <span className="text-[#F0C040]">500+ Products</span>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg border"
              style={{
                background: 'rgba(61,32,16,0.8)',
                borderColor: '#8B5E3C',
              }}
            >
              <Check className="w-5 h-5 text-[#F0C040]" />
              <span className="text-[#F0C040]">20+ Countries</span>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-lg border"
              style={{
                background: 'rgba(61,32,16,0.8)',
                borderColor: '#8B5E3C',
              }}
            >
              <Check className="w-5 h-5 text-[#F0C040]" />
              <span className="text-[#F0C040]">100% Natural</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
