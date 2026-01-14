
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
    order: 'desc',
    q: ''
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 bg-white p-6 rounded-lg border border-stone-100 shadow-sm">
          <div className="w-full flex flex-wrap gap-6 items-end">
            
            {/* Search Bar */}
            <div className="flex flex-col w-full md:w-64">
              <label className="text-[10px] uppercase tracking-widest font-bold mb-2 text-stone-400">Search</label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Find a fragrance..."
                  value={filters.q}
                  onChange={(e) => setFilters(prev => ({ ...prev, q: e.target.value }))}
                  className="w-full bg-stone-50 border border-stone-200 px-10 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {filters.q && (
                  <button 
                    onClick={() => setFilters(prev => ({ ...prev, q: '' }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

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
            <p className="text-stone-500 mb-6 font-light">Try adjusting your filters or search terms to explore more scents.</p>
            <button 
              onClick={() => setFilters({ category: 'All', minPrice: 0, maxPrice: 200, sortBy: 'date', order: 'desc', q: '' })}
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
