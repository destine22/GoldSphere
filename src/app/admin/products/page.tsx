'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';
import { Plus, Edit, Trash2, ExternalLink, Star } from 'lucide-react';
import { getProducts, deleteProduct as deleteProductAction } from '@/actions/products';
import { formatPrice } from '@/lib/currency';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  let filteredProducts = [...products];

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  if (stockFilter) {
    filteredProducts = filteredProducts.filter(p =>
      stockFilter === 'inStock' ? p.is_in_stock : !p.is_in_stock
    );
  }
  if (featuredFilter) {
    filteredProducts = filteredProducts.filter(p =>
      featuredFilter === 'featured' ? p.is_featured : !p.is_featured
    );
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectProduct = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      for (const id of selectedProducts) {
        await deleteProductAction(id);
      }
      setSelectedProducts([]);
      const data = await getProducts();
      setProducts(data);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      await deleteProductAction(id);
      const data = await getProducts();
      setProducts(data);
    }
  };

  if (loading) {
    return <div className="text-[#F0C040]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold font-[Playfair_Display] text-[#F0C040]">Products</h1>
            <span className="px-3 py-1 rounded-full bg-[#3D2010] text-[#C8A882] text-sm font-semibold">{products.length}</span>
          </div>
          <p className="text-[#C8A882] mt-1">Manage your product inventory</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity duration-300 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 items-center bg-[#3D2010] p-4 rounded-xl border border-[#8B5E3C]">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-4 py-2 bg-[#2C1A0E] border border-[#8B5E3C] rounded-lg text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-[#2C1A0E] border border-[#8B5E3C] rounded-lg text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="px-4 py-2 bg-[#2C1A0E] border border-[#8B5E3C] rounded-lg text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
        >
          <option value="">All Stock</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
        <select
          value={featuredFilter}
          onChange={(e) => setFeaturedFilter(e.target.value)}
          className="px-4 py-2 bg-[#2C1A0E] border border-[#8B5E3C] rounded-lg text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
        >
          <option value="">All</option>
          <option value="featured">Featured</option>
          <option value="notFeatured">Not Featured</option>
        </select>
      </div>

      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#C1440E]/20 border border-[#C1440E]">
          <span className="text-[#E8780C] font-semibold">{selectedProducts.length} product(s) selected</span>
          <button
            onClick={handleBulkDelete}
            className="px-4 py-2 bg-[#C1440E] text-[#F5E8C0] rounded-lg font-semibold hover:bg-[#C1440E]/80 transition-colors"
          >
            Bulk Delete
          </button>
        </div>
      )}

      <DataTable
        columns={[
          {
            key: 'select',
            header: '',
            width: '50px',
            render: (_: any, product: any) => (
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => toggleSelectProduct(product.id)}
                className="w-5 h-5 rounded border-[#8B5E3C] text-[#D4A017] focus:ring-[#D4A017]"
              />
            ),
          },
          {
            key: 'image',
            header: 'Image',
            width: '100px',
            render: (_: any, product: any) => (
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#2C1A0E] border border-[#8B5E3C] relative">
                <Image
                  src={product.image_url || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ),
          },
          {
            key: 'name',
            header: 'Name',
            render: (_: any, product: any) => (
              <span className="text-[#F0C040] font-medium">{product.name}</span>
            ),
          },
          {
            key: 'category',
            header: 'Category',
            render: (category: string) => (
              <span className="px-3 py-1 rounded-full bg-[#D4A017]/20 text-[#D4A017] text-xs font-semibold">{category}</span>
            ),
          },
          { key: 'origin_country', header: 'Origin' },
          {
            key: 'price',
            header: 'Price',
            render: (price: number) => formatPrice(price),
          },
          {
            key: 'is_in_stock',
            header: 'Stock',
            render: (is_in_stock: boolean) => (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                is_in_stock ? 'bg-[#6A9A5A]/20 text-[#8BC34A]' : 'bg-[#C1440E]/20 text-[#E8638A]'
              }`}>
                {is_in_stock ? 'In Stock' : 'Out of Stock'}
              </span>
            ),
          },
          {
            key: 'is_featured',
            header: 'Featured',
            render: (is_featured: boolean) => (
              is_featured && <Star className="w-5 h-5 text-[#D4A017] fill-current" />
            ),
          },
          {
            key: 'rating',
            header: 'Rating',
            render: (rating: number) => (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[#D4A017] fill-current" />
                <span className="text-[#F0C040] font-medium">{rating.toFixed(1)}</span>
              </div>
            ),
          },
        ]}
        data={paginatedProducts}
        actions={[
          {
            label: 'View',
            icon: <ExternalLink className="w-4 h-4" />,
            variant: 'secondary',
            onClick: (product: any) => window.open(`/products/${product.slug}`, '_blank'),
          },
          {
            label: 'Edit',
            icon: <Edit className="w-4 h-4" />,
            variant: 'primary',
            onClick: (product: any) => router.push(`/admin/products/${product.id}/edit`),
          },
          {
            label: 'Delete',
            icon: <Trash2 className="w-4 h-4" />,
            variant: 'danger',
            onClick: (product: any) => handleDeleteProduct(product.id, product.name),
          },
        ]}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-[#3D2010] p-4 rounded-xl border border-[#8B5E3C]">
          <div className="text-[#C8A882]">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-[#2C1A0E] border border-[#8B5E3C] text-[#E8D5A3] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A017]/10 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                  page === currentPage
                    ? 'bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800]'
                    : 'bg-[#2C1A0E] border border-[#8B5E3C] text-[#E8D5A3] hover:bg-[#D4A017]/10'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-[#2C1A0E] border border-[#8B5E3C] text-[#E8D5A3] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#D4A017]/10 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
