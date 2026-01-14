
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { Product, Review, SizeOption } from '../types';
import { ReviewForm } from '../components/ReviewForm';
import { ShareModal } from '../components/ShareModal';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [prodRes, revRes] = await Promise.all([
          apiService.getProduct(id),
          apiService.getReviews(id)
        ]);

        if (prodRes.success && prodRes.data) {
          setProduct(prodRes.data);
          setSelectedImage(prodRes.data.images[0]);
          setSelectedSize(prodRes.data.sizes[0]);
        }
        if (revRes.success) {
          setReviews(revRes.data);
        }
      } catch (error) {
        console.error('Error fetching product data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleReviewSubmit = async (name: string, rating: number, comment: string) => {
    if (!id) return;
    const res = await apiService.postReview(id, { name, rating, comment });
    if (res.success) {
      // Re-fetch reviews to show the new one
      const revRes = await apiService.getReviews(id);
      if (revRes.success) setReviews(revRes.data);
    }
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!product) return;
    const currentIndex = product.images.indexOf(selectedImage);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % product.images.length;
    } else {
      nextIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    }
    setSelectedImage(product.images[nextIndex]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 serif">Fragrance Not Found</h1>
        <Link to="/" className="text-stone-600 underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-8 text-sm text-stone-500 uppercase tracking-widest font-medium">
        <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-stone-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 shadow-sm group">
            <img 
              src={selectedImage} 
              alt={product.name} 
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-500" 
            />
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white text-stone-900"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white text-stone-900"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedImage(img)}
                className={`aspect-square overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-stone-900' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img 
                  src={img} 
                  alt={`${product.name} thumb ${idx}`} 
                  loading="lazy"
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8">
             <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-2 block">{product.category}</span>
             <h1 className="text-4xl md:text-5xl font-bold serif mb-4">{product.name}</h1>
             <div className="flex items-center space-x-2 mb-6">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                </div>
                <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">({reviews.length} reviews)</span>
             </div>
             <p className="text-3xl font-light text-stone-900 mb-8">${selectedSize?.price.toFixed(2)}</p>
             <p className="text-stone-600 leading-relaxed text-lg font-light mb-8 italic">"{product.shortDescription}"</p>
             <div className="prose prose-stone prose-lg mb-10 max-w-none">
               <p className="text-stone-700">{product.description}</p>
             </div>
          </div>

          <div className="mb-10">
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Select Size</h4>
            <div className="flex gap-4">
              {product.sizes.map((size) => (
                <button
                  key={size.sku}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-3 px-4 border text-sm font-semibold transition-all ${selectedSize?.sku === size.sku ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-900 border-stone-200 hover:border-stone-400'}`}
                >
                  {size.sizeLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
             <button className="flex-[2] bg-stone-900 text-white py-5 px-8 font-bold uppercase tracking-[0.2em] text-sm hover:bg-stone-800 transition-all flex items-center justify-center">
               Add to Cart
             </button>
             <button 
               onClick={() => setIsShareModalOpen(true)}
               className="flex-1 border border-stone-200 text-stone-900 py-5 px-8 font-bold uppercase tracking-[0.2em] text-sm hover:border-stone-900 transition-all flex items-center justify-center group"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
             </button>
          </div>

          <div className="border-t border-stone-200 pt-8 space-y-4">
             {product.tags.map(tag => (
               <span key={tag} className="inline-block text-[10px] font-bold uppercase tracking-widest bg-stone-100 text-stone-500 px-3 py-1 mr-2 rounded-full">#{tag}</span>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-24 border-t border-stone-200">
        <div className="lg:col-span-1">
          <ReviewForm onSubmit={handleReviewSubmit} />
        </div>
        
        <div className="lg:col-span-2">
          <h3 className="text-3xl font-bold mb-10 serif">Customer Reviews</h3>
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-stone-50 border border-dashed border-stone-300 rounded-lg">
              <p className="text-stone-500 italic">No reviews yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-10">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-stone-100 pb-8 last:border-0">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="font-bold text-lg mb-1">{review.name}</h5>
                      <div className="flex text-xs text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-stone-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed font-light">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ShareModal 
        productName={product.name} 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />
    </div>
  );
};
