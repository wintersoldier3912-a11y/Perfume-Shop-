
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { apiService } from '../services/api';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      const res = await apiService.getWishlist();
      if (res.success) {
        setIsWishlisted(res.data.some(p => p._id === product._id));
      }
    };
    checkWishlist();
  }, [product._id]);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await apiService.toggleWishlist(product._id);
    if (res.success) setIsWishlisted(res.data);
  };

  return (
    <div className="group block relative">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4 transition-all duration-500 shadow-sm group-hover:shadow-xl">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <span className="bg-white text-stone-900 px-6 py-3 text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
               View Details
             </span>
          </div>

          <div className="absolute top-4 left-4">
             <span className="bg-white/90 backdrop-blur-sm text-[10px] px-2 py-1 uppercase tracking-tighter font-semibold">
                {product.category}
             </span>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-bold mb-1 serif group-hover:text-stone-600 transition-colors">{product.name}</h3>
          <p className="text-stone-500 text-sm mb-2 line-clamp-2 max-w-xs mx-auto px-4">{product.shortDescription}</p>
          <p className="text-stone-900 font-medium tracking-wider">From ${product.basePrice.toFixed(2)}</p>
        </div>
      </Link>

      {/* Wishlist Toggle Button */}
      <button 
        onClick={toggleWishlist}
        className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-all z-10"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-stone-400'}`} 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          fill={isWishlisted ? "currentColor" : "none"}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
};
