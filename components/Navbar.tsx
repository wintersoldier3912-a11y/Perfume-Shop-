
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tighter serif">ESSENCE LUXE</Link>
          </div>
          
          <div className="hidden md:flex space-x-12 items-center">
            <Link to="/" className="text-sm font-medium hover:text-stone-500 transition-colors uppercase tracking-widest">Home</Link>
            <Link to="/collections" className="text-sm font-medium hover:text-stone-500 transition-colors uppercase tracking-widest">Collections</Link>
            <Link to="/wishlist" className="text-sm font-medium hover:text-stone-500 transition-colors uppercase tracking-widest flex items-center gap-1">
              Wishlist
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <button className="relative">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
               </svg>
               <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <Link to="/wishlist" className="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
             </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center py-8">
            <Link to="/" className="block px-3 py-4 text-lg font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/collections" className="block px-3 py-4 text-lg font-medium" onClick={() => setIsOpen(false)}>Collections</Link>
            <Link to="/wishlist" className="block px-3 py-4 text-lg font-medium" onClick={() => setIsOpen(false)}>Wishlist</Link>
          </div>
        </div>
      )}
    </nav>
  );
};
