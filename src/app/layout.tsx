import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import SupabaseAuthProvider from '@/components/SupabaseAuthProvider'
import { HydrationProvider } from '@/components/HydrationProvider'
import { baseMetadata } from '@/lib/metadata'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

export const metadata: Metadata = baseMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-[#FAF7F0]`}>
        <SupabaseAuthProvider>
          <HydrationProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <CartDrawer />
            </div>
          </HydrationProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  )
}
