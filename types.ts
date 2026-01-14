
export interface SizeOption {
  sizeLabel: string;
  price: number;
  sku: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  sizes: SizeOption[];
  images: string[];
  category: string;
  tags: string[];
  createdAt: string;
}

export interface Review {
  _id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
