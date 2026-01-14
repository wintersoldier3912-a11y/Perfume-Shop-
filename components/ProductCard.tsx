
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
    <div className="group block relative transition-all duration-500">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-6 transition-all duration-700 ease-out rounded-sm shadow-sm group-hover:shadow-2xl group-hover:-translate-y-1 border border-transparent group-hover:border-stone-200/50">
          {/* Subtle Zoom Image with Lazy Loading */}
          <img 
            src={product.images[0]} 
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1500ms] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
          />
          
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
             <span className="bg-white text-stone-900 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
               View Details
             </span>
          </div>

          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-10">
             <span className="bg-white/90 backdrop-blur-md text-[9px] px-3 py-1.5 uppercase tracking-[0.2em] font-bold text-stone-600 shadow-sm border border-stone-100">
                {product.category}
             </span>
          </div>
        </div>
        
        <div className="text-center px-2">
          <h3 className="text-lg font-bold mb-1.5 serif tracking-tight group-hover:text-stone-600 transition-colors duration-300">{product.name}</h3>
          <p className="text-stone-400 text-[13px] mb-3 line-clamp-2 max-w-[260px] mx-auto font-light leading-relaxed">{product.shortDescription}</p>
          <div className="inline-block relative">
            <p className="text-stone-900 font-semibold text-sm tracking-[0.1em]">
              ${product.basePrice.toFixed(2)}
            </p>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-900 group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </Link>

      {/* Wishlist Toggle Button */}
      <button 
        onClick={toggleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all z-20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-colors duration-300 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-stone-400 hover:text-stone-600'}`} 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          fill={isWishlisted ? "currentColor" : "none"}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
};
