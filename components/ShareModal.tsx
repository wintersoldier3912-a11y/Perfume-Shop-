
import React from 'react';

interface ShareModalProps {
  productName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ productName, isOpen, onClose }) => {
  if (!isOpen) return null;

  const currentUrl = window.location.href;
  const shareText = `Check out this amazing fragrance: ${productName} at Essence Luxe!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    alert('Link copied to clipboard!');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors">
           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
           </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 serif">Share this Fragrance</h2>
        
        <div className="space-y-4">
          <button 
            onClick={copyToClipboard}
            className="w-full flex items-center justify-between p-4 border border-stone-200 hover:bg-stone-50 transition-colors rounded-lg group"
          >
            <div className="flex items-center">
               <div className="p-2 bg-stone-100 rounded-md mr-4 group-hover:bg-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
               </div>
               <span className="font-medium">Copy Link</span>
            </div>
            <span className="text-xs text-stone-400 uppercase tracking-widest">Click to copy</span>
          </button>

          <button 
            onClick={shareTwitter}
            className="w-full flex items-center p-4 border border-stone-200 hover:bg-sky-50 transition-colors rounded-lg group"
          >
             <div className="p-2 bg-stone-100 rounded-md mr-4 group-hover:bg-white transition-colors">
                <svg className="h-5 w-5 fill-[#1DA1F2]" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
             </div>
             <span className="font-medium">Twitter</span>
          </button>

          <button 
            onClick={shareFacebook}
            className="w-full flex items-center p-4 border border-stone-200 hover:bg-blue-50 transition-colors rounded-lg group"
          >
             <div className="p-2 bg-stone-100 rounded-md mr-4 group-hover:bg-white transition-colors">
                <svg className="h-5 w-5 fill-[#4267B2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
             </div>
             <span className="font-medium">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
};
