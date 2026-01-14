
import React, { useEffect, useState } from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { ProductCard } from '../components/ProductCard';
import { apiService, ProductFilters } from '../services/api';
import { Product } from '../types';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'All',
    minPrice: 0,
    maxPrice: 200,
    sortBy: 'date',
    order: 'desc'
  });

  const categories = ['All', 'Oriental', 'Marine', 'Floral', 'Citrus', 'Woody'];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await apiService.getProducts(filters);
        if (response.success) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [filters]);

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const num = value === '' ? (type === 'min' ? 0 : 200) : Number(value);
    setFilters(prev => ({
      ...prev,
      [type === 'min' ? 'minPrice' : 'maxPrice']: num
    }));
  };

  return (
    <div className="pb-20">
      <HeroBanner />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8 bg-white p-6 rounded-lg border border-stone-100 shadow-sm">
          <div className="w-full flex flex-wrap gap-6 items-end">
            {/* Category Filter */}
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest font-bold mb-2 text-stone-400">Category</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest font-bold mb-2 text-stone-400">Price Range ($)</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-20 bg-stone-50 border border-stone-200 px-2 py-2 text-sm focus:outline-none focus:border-stone-900"
                />
                <span className="text-stone-300">-</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-20 bg-stone-50 border border-stone-200 px-2 py-2 text-sm focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* Quick Slider */}
            <div className="flex flex-col hidden sm:flex">
              <label className="text-[10px] uppercase tracking-widest font-bold mb-2 text-stone-400">Max Price Limit: ${filters.maxPrice}</label>
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="5"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-32 accent-stone-900 cursor-pointer"
              />
            </div>

            {/* Sort */}
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest font-bold mb-2 text-stone-400">Sort By</label>
              <select 
                value={`${filters.sortBy}-${filters.order}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-') as [any, any];
                  setFilters(prev => ({ ...prev, sortBy: field, order: order }));
                }}
                className="bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors cursor-pointer"
              >
                <option value="date-desc">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
              </select>
            </div>
          </div>

          <div className="lg:text-right w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">
              {products.length} {products.length === 1 ? 'Fragrance' : 'Fragrances'} Found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-stone-200 aspect-[3/4] mb-4 rounded"></div>
                <div className="h-4 bg-stone-200 w-3/4 mx-auto mb-2 rounded"></div>
                <div className="h-3 bg-stone-200 w-1/2 mx-auto rounded"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-32 text-center bg-stone-50 rounded-xl border border-dashed border-stone-200">
            <h3 className="text-2xl serif mb-4">No matches found</h3>
            <p className="text-stone-500 mb-6 font-light">Try adjusting your filters or price range to explore more scents.</p>
            <button 
              onClick={() => setFilters({ category: 'All', minPrice: 0, maxPrice: 200, sortBy: 'date', order: 'desc' })}
              className="bg-stone-900 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-stone-800 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
