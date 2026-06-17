'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, MapPin, Star } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/currency';
import type { Product } from '@/types/supabase';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addItem(product, 1);
    openCart();
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-[#F0C040] text-[#F0C040]" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-[#F0C040] text-[#F0C040]" />
      );
    }
    const emptyStars = 5 - Math.ceil(product.rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-[#6B3A1F]" />
      );
    }
    return stars;
  };

  return (
    <Link href={`/products/${product.slug}`} className="block">
      <div
        className="rounded-xl overflow-hidden group transition-all duration-300 border"
        style={{
          background: 'linear-gradient(160deg, #3D2010, #4A2C15)',
          borderColor: '#8B5E3C',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#D4A017';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,160,23,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#8B5E3C';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image_url || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.is_featured && (
            <div
              className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #C1440E, #D4A017)',
                color: '#1A0800',
              }}
            >
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-wider mb-2"
            style={{
              background: 'linear-gradient(135deg, #C1440E, #D4A017)',
              color: '#1A0800',
              padding: '0.25rem 0.75rem',
              borderRadius: '0.375rem',
            }}
          >
            {product.category}
          </span>
          <h3 className="text-lg font-[Playfair_Display] font-bold text-[#F0C040] mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 text-[#C8A882] text-sm mb-2">
            <MapPin className="w-4 h-4 text-[#E8780C]" />
            {product.origin_country}
          </div>
          <div className="text-xs text-[#A07850] mb-3">
            {product.weight}
          </div>
          <div className="flex items-center gap-1 mb-3">
            {renderStars()}
            <span className="text-xs text-[#C8A882] ml-1">({product.review_count})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#F0C040]">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 text-[#1A0800] hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #D4A017, #C1440E)',
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

