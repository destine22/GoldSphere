'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import { createProduct } from '@/actions/products';

export default function AdminNewProductPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await createProduct(data);
    alert('Product added successfully!');
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
        <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040]">
          Add New Product
        </h1>
      </div>
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/products')}
      />
    </div>
  );
}
