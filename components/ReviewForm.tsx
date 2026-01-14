
import React, { useState } from 'react';

interface ReviewFormProps {
  onSubmit: (name: string, rating: number, comment: string) => Promise<void>;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;
    
    setIsSubmitting(true);
    await onSubmit(name, rating, comment);
    setName('');
    setComment('');
    setRating(5);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border border-stone-200 shadow-sm rounded-lg">
      <h3 className="text-xl font-bold mb-6 serif">Share Your Experience</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold mb-2 text-stone-500">Your Name</label>
          <input 
            type="text" 
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-stone-200 border p-3 focus:outline-none focus:border-stone-900 transition-colors"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-semibold mb-2 text-stone-500">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-stone-200'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs uppercase tracking-widest font-semibold mb-2 text-stone-500">Your Review</label>
        <textarea 
          required
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border-stone-200 border p-3 focus:outline-none focus:border-stone-900 transition-colors"
          placeholder="What did you love about this fragrance?"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-stone-900 text-white py-4 uppercase tracking-[0.2em] font-bold text-sm hover:bg-stone-800 disabled:bg-stone-400 transition-all"
      >
        {isSubmitting ? 'Submitting...' : 'Post Review'}
      </button>
    </form>
  );
};
