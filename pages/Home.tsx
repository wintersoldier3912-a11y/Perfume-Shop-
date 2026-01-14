
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

  return (
    <div className="pb-20">
      <HeroBanner />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 bg-white p-6 rounded-lg border border-stone-100 shadow-sm">
          <div className="w-full md:w-auto grid grid-cols-2 lg:flex gap-4 items-center">
            {/* Category Filter */}
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest font-bold mb-1 text-stone-400">Category</label>
              <select 
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-900"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest font-bold mb-1 text-stone-400">Max Price: ${filters.maxPrice}</label>
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="10"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-32 accent-stone-900"
              />
            </div>

            {/* Sort */}
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest font-bold mb-1 text-stone-400">Sort By</label>
              <select 
                value={`${filters.sortBy}-${filters.order}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-') as [any, any];
                  setFilters(prev => ({ ...prev, sortBy: field, order: order }));
                }}
                className="bg-stone-50 border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:border-stone-900"
              >
                <option value="date-desc">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Alphabetical</option>
              </select>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Showing {products.length} Products</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-stone-200 aspect-[3/4] mb-4"></div>
                <div className="h-4 bg-stone-200 w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-stone-200 w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-2xl serif mb-2">No fragrances match your filters.</h3>
            <button 
              onClick={() => setFilters({ category: 'All', maxPrice: 200, sortBy: 'date', order: 'desc' })}
              className="text-stone-500 underline uppercase tracking-widest text-xs font-bold"
            >
              Reset Filters
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
