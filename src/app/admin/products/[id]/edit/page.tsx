'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import { getProductById, updateProduct } from '@/actions/products';

export default function AdminEditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const id = params?.id as string;

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-[#F0C040]">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <div className="text-[#C8A882] text-lg mb-4">Product not found</div>
        <button
          onClick={() => router.push('/admin/products')}
          className="text-[#D4A017] font-semibold hover:underline"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleSubmit = async (data: any) => {
    await updateProduct(id, data);
    alert('Product updated successfully!');
    router.push('/admin/products');
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/admin/products')}
          className="p-2 rounded-lg hover:bg-[#3D2010] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#F0C040]" />
        </button>
        <div>
          <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040]">
            Edit Product
          </h1>
          <p className="text-[#C8A882] mt-1">{product.name}</p>
        </div>
      </div>
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/products')}
      />
    </div>
  );
}
