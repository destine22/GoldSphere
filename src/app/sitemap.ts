import { MetadataRoute } from 'next'
import { getProducts } from '@/actions/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts().catch(() => [])
  const productUrls = products.map(product => ({
    url: `${process.env.NEXT_PUBLIC_URL}/products/${product.slug}`,
    lastModified: new Date(product.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: process.env.NEXT_PUBLIC_URL!, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${process.env.NEXT_PUBLIC_URL}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${process.env.NEXT_PUBLIC_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...productUrls,
  ]
}
