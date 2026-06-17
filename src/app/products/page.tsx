import { getProductsPublic } from '@/actions/products';
import ProductsClient from '@/components/ProductsClient';

export default async function ProductsPage() {
  const products = await getProductsPublic();
  return <ProductsClient products={products} />;
}

