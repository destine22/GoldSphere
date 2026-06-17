'use client';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div
      className="flex overflow-x-auto scrollbar-hide gap-3 pb-2 py-3 border-b"
      style={{
        background: 'rgba(44,26,14,0.8)',
        borderColor: '#8B5E3C',
      }}
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className="px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300"
          style={{
            background:
              selectedCategory === category
                ? 'linear-gradient(135deg, #D4A017, #E8780C)'
                : '#3D2010',
            color: selectedCategory === category ? '#1A0800' : '#E8D5A3',
            border: selectedCategory === category ? 'none' : '1px solid #8B5E3C',
          }}
          onMouseEnter={(e) => {
            if (selectedCategory !== category) {
              e.currentTarget.style.background = '#4A2C15';
              e.currentTarget.style.borderColor = '#A07850';
              e.currentTarget.style.color = '#F0C040';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategory !== category) {
              e.currentTarget.style.background = '#3D2010';
              e.currentTarget.style.borderColor = '#8B5E3C';
              e.currentTarget.style.color = '#E8D5A3';
            }
          }}
        >
          {category === 'all' ? 'All' : category}
        </button>
      ))}
    </div>
  );
}

