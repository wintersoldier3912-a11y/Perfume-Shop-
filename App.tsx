
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { Wishlist } from './pages/Wishlist';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/collections" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<div className="p-20 text-center"><h1 className="text-4xl serif">About Essence Luxe</h1><p className="mt-4 text-stone-500 max-w-xl mx-auto">Founded in 2025, we bring the finest scents from across the globe directly to your doorstep.</p></div>} />
          </Routes>
        </main>
        
        <footer className="bg-stone-900 text-stone-400 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                 <h2 className="text-2xl font-bold text-white mb-6 tracking-tighter serif">ESSENCE LUXE</h2>
                 <p className="text-sm leading-relaxed max-w-sm">
                   Crafting olfactory masterpieces that tell a story. We believe every scent is a memory waiting to be shared.
                 </p>
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Quick Links</h4>
                <ul className="space-y-4 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Fragrances</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Discovery Sets</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Newsletter</h4>
                <p className="text-sm mb-4">Join our list for exclusive releases.</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="bg-stone-800 border-none px-4 py-2 text-sm focus:ring-1 focus:ring-stone-500 w-full"
                  />
                  <button className="bg-white text-stone-900 px-4 py-2 text-xs font-bold uppercase tracking-widest">Join</button>
                </div>
              </div>
            </div>
            <div className="border-t border-stone-800 pt-8 text-[10px] uppercase tracking-[0.3em] text-center">
              © 2025 Essence Luxe Perfumery. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
