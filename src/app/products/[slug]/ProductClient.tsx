'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Package, Check, Star, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice } from '@/lib/currency';
import type { Product } from '@/types/supabase';

interface ProductClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    await addItem(product, quantity);
    openCart();
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />
      );
    }
    const emptyStars = 5 - Math.ceil(product.rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(180deg, #1A0800 0%, #2C1A0E 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/" className="text-[#C8A882] hover:text-[#C9A84C]">
                Home
              </Link>
            </li>
            <li className="text-[#8B5E3C]">/</li>
            <li>
              <Link href="/products" className="text-[#C8A882] hover:text-[#C9A84C]">
                Products
              </Link>
            </li>
            <li className="text-[#8B5E3C]">/</li>
            <li className="text-[#F0C040] font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#3D2010] shadow-lg border border-[#8B5E3C]">
            <Image
              src={product.image_url || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="inline-block text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-3">
              {product.category}
            </span>
            <h1 className="text-4xl font-[Playfair_Display] font-bold text-[#F0C040] mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 text-[#C8A882] mb-4">
              <MapPin className="w-5 h-5" />
              <span>{product.origin_country}</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">{renderStars()}</div>
              <span className="text-[#C8A882]">({product.review_count} reviews)</span>
            </div>

            <div className="text-3xl font-bold text-[#F0C040] mb-6">
              {formatPrice(product.price)}
            </div>

            {product.weight && (
              <p className="text-[#C8A882] mb-6">{product.weight}</p>
            )}

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#8B5E3C] rounded-lg bg-[#2C1A0E]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-[#3D2010] transition-colors text-[#E8D5A3]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-[#8B5E3C] text-lg font-medium text-[#F5E8C0]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-[#3D2010] transition-colors text-[#E8D5A3]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Add to Cart
              </button>
            </div>

            <div className="border-t border-[#8B5E3C] pt-6 space-y-4">
              <div className="flex items-center gap-3 text-[#C8A882]">
                <Check className="w-5 h-5 text-[#C9A84C]" />
                <span>Sourced directly from African farmers</span>
              </div>
              <div className="flex items-center gap-3 text-[#C8A882]">
                <Package className="w-5 h-5 text-[#C9A84C]" />
                <span>Delivered fresh to your door</span>
              </div>
              <div className="flex items-center gap-3 text-[#C8A882]">
                <Check className="w-5 h-5 text-[#C9A84C]" />
                <span>100% natural, no preservatives</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start border-b border-[#8B5E3C] bg-transparent mb-6">
            <TabsTrigger
              value="description"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#C9A84C] data-[state=active]:text-[#C9A84C] rounded-none px-6 py-3 text-[#C8A882]"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="how-to-use"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#C9A84C] data-[state=active]:text-[#C9A84C] rounded-none px-6 py-3 text-[#C8A882]"
            >
              How to Use
            </TabsTrigger>
            <TabsTrigger
              value="storage"
              className="data-[state=active]:border-b-2 data-[state=active]:border-[#C9A84C] data-[state=active]:text-[#C9A84C] rounded-none px-6 py-3 text-[#C8A882]"
            >
              Storage
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-[#C8A882] leading-relaxed">
            <p>{product.description}</p>
          </TabsContent>
          <TabsContent value="how-to-use" className="text-[#C8A882] leading-relaxed">
            <p>{product.how_to_use}</p>
          </TabsContent>
          <TabsContent value="storage" className="text-[#C8A882] leading-relaxed">
            <p>{product.storage_instructions}</p>
          </TabsContent>
        </Tabs>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-3xl font-[Playfair_Display] font-bold text-[#F0C040] mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

