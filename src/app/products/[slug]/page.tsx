import { notFound } from 'next/navigation'
import { getProductsPublic, getProductBySlugPublic, getProductsByCategory } from '@/actions/products'
import ProductClient from './ProductClient'

export async function generateStaticParams() {
  try {
    const products = await getProductsPublic();
    return products.map((product) => ({
      slug: product.slug,
    }))
  } catch {
    return []
  }
}

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlugPublic(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlugPublic(slug)

  if (!product) {
    notFound()
  }

  const categoryProducts = await getProductsByCategory(product.category)
  const relatedProducts = categoryProducts.filter(p => p.id !== product.id).slice(0, 4)

  return <ProductClient product={product} relatedProducts={relatedProducts} />
}
