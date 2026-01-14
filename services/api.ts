
import { Product, Review, ApiResponse } from '../types';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'name' | 'date';
  order?: 'asc' | 'desc';
  q?: string;
}

class MockBackend {
  private products: Product[] = [
    {
      _id: '1',
      name: 'Noir Velvet',
      slug: 'noir-velvet',
      shortDescription: 'Rich oriental scent with vanilla and amber.',
      description: 'Noir Velvet is a sophisticated scent blending bergamot, jasmine, and warm amber. Designed for the mystery of the night, it leaves a trail of elegance and depth that lingers long after you leave the room.',
      basePrice: 45.0,
      sizes: [
        { sizeLabel: '30ml', price: 45.0, sku: 'NV-30' },
        { sizeLabel: '50ml', price: 68.0, sku: 'NV-50' }
      ],
      images: [
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1512789675373-06a989f6683a?auto=format&fit=crop&q=80&w=800'
      ],
      category: 'Oriental',
      tags: ['evening', 'amber'],
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      _id: '2',
      name: 'Azure Breeze',
      slug: 'azure-breeze',
      shortDescription: 'Fresh marine notes and sea salt.',
      description: 'Capture the essence of the Mediterranean with Azure Breeze. Crisp ozone notes meet salty spray and a hint of lemon, perfect for those who crave the freedom of the open sea.',
      basePrice: 38.0,
      sizes: [{ sizeLabel: '30ml', price: 38.0, sku: 'AB-30' }],
      images: [
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=800'
      ],
      category: 'Marine',
      tags: ['day', 'fresh'],
      createdAt: '2025-02-01T10:00:00Z'
    },
    {
      _id: '3',
      name: 'Midnight Rose',
      slug: 'midnight-rose',
      shortDescription: 'Sultry Bulgarian rose and patchouli.',
      description: 'A deep, mysterious floral experience for the bold. Midnight Rose combines the timeless beauty of the rose with the earthy, dark undertones of aged patchouli and musk.',
      basePrice: 120.0,
      sizes: [{ sizeLabel: '50ml', price: 120.0, sku: 'MR-50' }],
      images: [
        'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1585120040315-2241b774ad0f?auto=format&fit=crop&q=80&w=800'
      ],
      category: 'Floral',
      tags: ['luxury', 'bold'],
      createdAt: '2025-02-15T10:00:00Z'
    },
    {
      _id: '4',
      name: 'Golden Citrus',
      slug: 'golden-citrus',
      shortDescription: 'Bright orange and sparkling bergamot.',
      description: 'The ultimate mood lifter for sunny mornings. Golden Citrus is a vibrant burst of Mediterranean sunshine, featuring cold-pressed orange oils and sparkling grapefruit zest.',
      basePrice: 32.0,
      sizes: [{ sizeLabel: '30ml', price: 32.0, sku: 'GC-30' }],
      images: [
        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800'
      ],
      category: 'Citrus',
      tags: ['bright', 'energetic'],
      createdAt: '2025-03-01T10:00:00Z'
    },
    {
      _id: '5',
      name: 'Oud Mystique',
      slug: 'oud-mystique',
      shortDescription: 'Smoky oud and sandalwood.',
      description: 'An ancient, powerful scent profile for connoisseurs. This fragrance features rare Cambodian Oud blended with creamy Mysore sandalwood and a touch of incense.',
      basePrice: 155.0,
      sizes: [{ sizeLabel: '100ml', price: 155.0, sku: 'OM-100' }],
      images: [
        'https://images.unsplash.com/photo-1615307398180-874251786500?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
      ],
      category: 'Woody',
      tags: ['unisex', 'intense', 'oud'],
      createdAt: '2025-01-10T10:00:00Z'
    }
  ];

  private reviews: Review[] = [];
  private wishlist: Set<string> = new Set();

  async getProducts(filters: ProductFilters = {}): Promise<ApiResponse<Product[]>> {
    await new Promise(r => setTimeout(r, 400));
    let filtered = [...this.products];

    // Search Query Filtering
    if (filters.q) {
      const query = filters.q.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query)
      );
    }

    // Category Filtering
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
    }

    // Min Price Filtering
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.basePrice >= filters.minPrice!);
    }

    // Max Price Filtering
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.basePrice <= filters.maxPrice!);
    }

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let valA: any;
        let valB: any;

        switch (filters.sortBy) {
          case 'price':
            valA = a.basePrice;
            valB = b.basePrice;
            break;
          case 'name':
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
            break;
          case 'date':
            valA = new Date(a.createdAt).getTime();
            valB = new Date(b.createdAt).getTime();
            break;
          default:
            valA = a.basePrice;
            valB = b.basePrice;
        }

        if (filters.order === 'desc') {
          return valB > valA ? 1 : (valB < valA ? -1 : 0);
        } else {
          return valA > valB ? 1 : (valA < valB ? -1 : 0);
        }
      });
    }

    return { success: true, data: filtered };
  }

  async getProductById(id: string): Promise<ApiResponse<Product | null>> {
    const product = this.products.find(p => p._id === id);
    return { success: true, data: product || null };
  }

  async getReviews(productId: string): Promise<ApiResponse<Review[]>> {
    const reviews = this.reviews.filter(r => r.productId === productId);
    return { success: true, data: reviews };
  }

  async postReview(productId: string, name: string, rating: number, comment: string): Promise<ApiResponse<Review>> {
    const newReview = { _id: Date.now().toString(), productId, name, rating, comment, createdAt: new Date().toISOString() };
    this.reviews.push(newReview);
    return { success: true, data: newReview };
  }

  async getWishlist(): Promise<ApiResponse<Product[]>> {
    const data = this.products.filter(p => this.wishlist.has(p._id));
    return { success: true, data };
  }

  async toggleWishlist(productId: string): Promise<ApiResponse<boolean>> {
    if (this.wishlist.has(productId)) {
      this.wishlist.delete(productId);
    } else {
      this.wishlist.add(productId);
    }
    return { success: true, data: this.wishlist.has(productId) };
  }
}

const mockBackend = new MockBackend();

export const apiService = {
  getProducts: (filters?: ProductFilters) => mockBackend.getProducts(filters),
  getProduct: (id: string) => mockBackend.getProductById(id),
  getReviews: (productId: string) => mockBackend.getReviews(productId),
  postReview: (productId: string, body: { name: string; rating: number; comment: string }) => 
    mockBackend.postReview(productId, body.name, body.rating, body.comment),
  getWishlist: () => mockBackend.getWishlist(),
  toggleWishlist: (productId: string) => mockBackend.toggleWishlist(productId)
};
