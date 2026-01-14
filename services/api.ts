
import { Product, Review, ApiResponse } from '../types';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'name' | 'date';
  order?: 'asc' | 'desc';
}

class MockBackend {
  private products: Product[] = [
    {
      _id: '1',
      name: 'Noir Velvet',
      slug: 'noir-velvet',
      shortDescription: 'Rich oriental scent with vanilla and amber.',
      description: 'Noir Velvet is a sophisticated scent blending bergamot, jasmine, and warm amber.',
      basePrice: 45.0,
      sizes: [
        { sizeLabel: '30ml', price: 45.0, sku: 'NV-30' },
        { sizeLabel: '50ml', price: 68.0, sku: 'NV-50' }
      ],
      images: ['https://picsum.photos/seed/noir1/800/1000'],
      category: 'Oriental',
      tags: ['evening'],
      createdAt: '2025-01-01T10:00:00Z'
    },
    {
      _id: '2',
      name: 'Azure Breeze',
      slug: 'azure-breeze',
      shortDescription: 'Fresh marine notes and sea salt.',
      description: 'Capture the essence of the Mediterranean with Azure Breeze.',
      basePrice: 38.0,
      sizes: [{ sizeLabel: '30ml', price: 38.0, sku: 'AB-30' }],
      images: ['https://picsum.photos/seed/azure1/800/1000'],
      category: 'Marine',
      tags: ['day'],
      createdAt: '2025-02-01T10:00:00Z'
    },
    {
      _id: '3',
      name: 'Midnight Rose',
      slug: 'midnight-rose',
      shortDescription: 'Sultry Bulgarian rose and patchouli.',
      description: 'A deep, mysterious floral experience for the bold.',
      basePrice: 120.0,
      sizes: [{ sizeLabel: '50ml', price: 120.0, sku: 'MR-50' }],
      images: ['https://picsum.photos/seed/rose1/800/1000'],
      category: 'Floral',
      tags: ['luxury', 'bold'],
      createdAt: '2025-02-15T10:00:00Z'
    },
    {
      _id: '4',
      name: 'Golden Citrus',
      slug: 'golden-citrus',
      shortDescription: 'Bright orange and sparkling bergamot.',
      description: 'The ultimate mood lifter for sunny mornings.',
      basePrice: 32.0,
      sizes: [{ sizeLabel: '30ml', price: 32.0, sku: 'GC-30' }],
      images: ['https://picsum.photos/seed/citrus1/800/1000'],
      category: 'Citrus',
      tags: ['bright'],
      createdAt: '2025-03-01T10:00:00Z'
    },
    {
      _id: '5',
      name: 'Oud Mystique',
      slug: 'oud-mystique',
      shortDescription: 'Smoky oud and sandalwood.',
      description: 'An ancient, powerful scent profile for connoisseurs.',
      basePrice: 155.0,
      sizes: [{ sizeLabel: '100ml', price: 155.0, sku: 'OM-100' }],
      images: ['https://picsum.photos/seed/oud1/800/1000'],
      category: 'Woody',
      tags: ['unisex', 'intense'],
      createdAt: '2025-01-10T10:00:00Z'
    }
  ];

  private reviews: Review[] = [];
  private wishlist: Set<string> = new Set();

  async getProducts(filters: ProductFilters = {}): Promise<ApiResponse<Product[]>> {
    await new Promise(r => setTimeout(r, 400));
    let filtered = [...this.products];

    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.basePrice >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.basePrice <= filters.maxPrice!);
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let valA: any = a[filters.sortBy as keyof Product] || a.basePrice;
        let valB: any = b[filters.sortBy as keyof Product] || b.basePrice;
        if (filters.sortBy === 'date') {
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
        }
        if (filters.order === 'desc') return valB > valA ? 1 : -1;
        return valA > valB ? 1 : -1;
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

  // Wishlist Logic
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
