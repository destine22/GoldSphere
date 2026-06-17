import type { Metadata } from 'next'

export const baseMetadata: Metadata = {
  title: {
    default: 'GoldSphere — Authentic Raw African Foods',
    template: '%s | GoldSphere',
  },
  description: 'Premium raw African food sourced directly from farmers across Africa. Delivered across Europe.',
  keywords: ['African food', 'raw ingredients', 'authentic African products', 'Nigerian food', 'Ghanaian food'],
  openGraph: {
    type: 'website',
    locale: 'en_EU',
    url: process.env.NEXT_PUBLIC_URL,
    siteName: 'GoldSphere',
  },
}
