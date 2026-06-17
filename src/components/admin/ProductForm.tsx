'use client';

import { useState, useEffect, useRef } from 'react';
import { getProducts } from '@/actions/products';
import { uploadImage } from '@/actions/upload';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [imageOption, setImageOption] = useState<'url' | 'upload'>('url');
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.image_url || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchCategories() {
      const products = await getProducts();
      const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
      if (uniqueCategories.length === 0) {
        uniqueCategories.push('Spices', 'Grains', 'Oils', 'Snacks');
      }
      setCategories(uniqueCategories);
    }
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || categories[0] || 'Spices',
    origin_country: initialData?.origin_country || '',
    weight: initialData?.weight || '',
    price: initialData?.price?.toString() || '',
    unit: initialData?.unit || 'kg',
    image_url: initialData?.image_url || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
    description: initialData?.description || '',
    how_to_use: initialData?.how_to_use || '',
    storage_instructions: initialData?.storage_instructions || '',
    is_featured: initialData?.is_featured || false,
    is_in_stock: initialData?.is_in_stock || true,
    rating: initialData?.rating?.toString() || '5.0',
    review_count: initialData?.review_count?.toString() || '0',
    slug: initialData?.slug || '',
  });

  // Update category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !initialData) {
      setFormData(prev => ({ ...prev, category: categories[0] }));
    }
  }, [categories]);

  // Update preview URL when image URL changes
  useEffect(() => {
    if (imageOption === 'url') {
      setPreviewUrl(formData.image_url);
    }
  }, [formData.image_url, imageOption]);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create local preview
    const localPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(localPreviewUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const result = await uploadImage(formData);
      
      if (result.error) {
        alert(result.error);
        setPreviewUrl(initialData?.image_url || '');
      } else if (result.url) {
        setFormData(prev => ({ ...prev, image_url: result.url }));
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      alert('Please fill in all required fields (Name, Category, Price, Description)');
      return;
    }

    const productSlug = formData.slug || generateSlug(formData.name);

    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      review_count: parseInt(formData.review_count),
      slug: productSlug,
    });
  };

  const ToggleSwitch = ({
    checked,
    onChange,
    label,
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
  }) => (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
          checked ? 'bg-[#D4A017]' : 'bg-[#6B3A1F]'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
            checked ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span className="text-sm font-medium text-[#E8D5A3]">{label}</span>
    </label>
  );

  return (
    <div className="rounded-xl shadow-lg p-8 border border-[#8B5E3C] max-w-4xl mx-auto" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15 )' }}>
      <h2 className="text-2xl font-bold font-[Playfair_Display] text-[#F0C040] mb-8">
        {initialData ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name - full width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#F0C040] mb-2">
            Product Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              // Auto-generate slug if not set
              if (!initialData) {
                setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
              }
            }}
            className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
            placeholder="Enter product name"
          />
        </div>

        {/* Slug - full width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#F0C040] mb-2">
            Slug (URL-friendly name)
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
            placeholder="product-slug"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#F0C040] mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#F0C040] mb-2">
              Origin Country
            </label>
            <input
              type="text"
              required
              value={formData.origin_country}
              onChange={(e) => setFormData({ ...formData, origin_country: e.target.value })}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
              placeholder="e.g., Nigeria"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#F0C040] mb-2">
              Price (NGN ₦)
            </label>
            <input
              type="number"
              step="1"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#F0C040] mb-2">
              Weight
            </label>
            <input
              type="text"
              required
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
              placeholder="e.g., 1kg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#F0C040] mb-2">
              Unit
            </label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="L">L</option>
              <option value="mL">mL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#F0C040] mb-2">
              Rating (0-5)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
              placeholder="5.0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#F0C040] mb-2">
              Review Count
            </label>
            <input
              type="number"
              min="0"
              value={formData.review_count}
              onChange={(e) => setFormData({ ...formData, review_count: e.target.value })}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
              placeholder="0"
            />
          </div>
        </div>

        {/* Image Section - full width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#F0C040] mb-4">
            Product Image
          </label>

          {/* Image Option Tabs */}
          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setImageOption('url')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                imageOption === 'url'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800]'
                  : 'border border-[#8B5E3C] text-[#C8A882] hover:bg-[#3D2010]'
              }`}
            >
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Image URL
              </span>
            </button>
            <button
              type="button"
              onClick={() => setImageOption('upload')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                imageOption === 'upload'
                  ? 'bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800]'
                  : 'border border-[#8B5E3C] text-[#C8A882] hover:bg-[#3D2010]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Image
              </span>
            </button>
          </div>

          {/* Image URL Input */}
          {imageOption === 'url' && (
            <div>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          {/* Image Upload */}
          {imageOption === 'upload' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#8B5E3C] rounded-lg p-8 text-center cursor-pointer hover:border-[#D4A017] transition-colors duration-300 bg-[#2C1A0E]"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-[#D4A017] animate-spin" />
                    <span className="text-[#C8A882]">Uploading...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-[#D4A017]" />
                    <span className="text-[#F5E8C0] font-medium">Click to upload or drag and drop</span>
                    <span className="text-sm text-[#C8A882]">PNG, JPG, GIF up to 5MB</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Image Preview */}
          {previewUrl && (
            <div className="mt-4">
              <div className="relative inline-block">
                <img
                  src={previewUrl}
                  alt="Product preview"
                  className="w-48 h-48 object-cover rounded-lg border border-[#8B5E3C]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Description - full width */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#F0C040] mb-2">
            Description
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
            placeholder="Product description..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[#F0C040] mb-2">
              How to Use
            </label>
            <textarea
              value={formData.how_to_use}
              onChange={(e) => setFormData({ ...formData, how_to_use: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
              placeholder="Usage instructions..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#F0C040] mb-2">
              Storage Instructions
            </label>
            <textarea
              value={formData.storage_instructions}
              onChange={(e) => setFormData({ ...formData, storage_instructions: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-[#8B5E3C] rounded-lg bg-[#2C1A0E] text-[#F5E8C0] focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017]"
              placeholder="Storage instructions..."
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-8 py-4">
          <ToggleSwitch
            checked={formData.is_in_stock}
            onChange={(checked) => setFormData({ ...formData, is_in_stock: checked })}
            label="In Stock"
          />
          <ToggleSwitch
            checked={formData.is_featured}
            onChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            label="Featured Product"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-[#D4A017] to-[#E8780C] text-[#1A0800] py-3 px-6 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity duration-300 shadow-lg"
          >
            {initialData ? 'Update Product' : 'Save Product'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-[#8B5E3C] rounded-lg font-semibold text-[#C8A882] hover:bg-[#3D2010] transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
