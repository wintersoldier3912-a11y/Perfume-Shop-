
import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-stone-900">
      <img 
        src="https://picsum.photos/seed/hero-perfume/1920/1080" 
        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
        alt="Hero fragrance"
      />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl text-white font-bold mb-6 leading-tight drop-shadow-xl serif">
          Discover Your <br/><span className="italic font-normal">Signature Scent</span>
        </h1>
        <p className="text-stone-200 text-lg md:text-xl mb-10 font-light tracking-wide max-w-2xl mx-auto">
          Explore our curated collection of luxury fragrances crafted by world-renowned perfumers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-stone-900 px-10 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-stone-200 transition-all transform hover:-translate-y-1">
            Shop Collection
          </button>
          <button className="border border-white text-white px-10 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-white hover:text-stone-900 transition-all transform hover:-translate-y-1">
            Our Story
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};
