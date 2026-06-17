'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1A0800] flex items-center justify-center flex-col gap-8">
      <h1 className="text-6xl font-bold font-[Playfair_Display] text-[#F0C040]">404</h1>
      <p className="text-xl text-[#C8A882]">Page not found</p>
      <Link
        href="/"
        className="bg-gradient-to-r from-[#D4A017] to-[#E8780C] px-8 py-3 rounded-lg text-[#1A0800] font-bold hover:opacity-90 transition-all"
      >
        Go Home
      </Link>
    </div>
  )
}
