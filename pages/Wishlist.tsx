
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export const Wishlist: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    const res = await apiService.getWishlist();
    if (res.success) setProducts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
      <div className="mb-12 border-b border-stone-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold serif mb-4">My Wishlist</h1>
        <p className="text-stone-500 italic">Fragrances that captured your heart.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-stone-900"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-32 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-stone-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-xl serif text-stone-900 mb-4">Your wishlist is empty</h2>
          <Link to="/" className="inline-block bg-stone-900 text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-stone-800 transition-all">
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
