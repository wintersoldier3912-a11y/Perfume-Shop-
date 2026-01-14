# Essence Luxe | Fine Fragrances

Essence Luxe is a premium e-commerce experience designed for luxury fragrance enthusiasts. This application features a modern, responsive interface with high-performance filtering, sorting, and personalized user features.

![Essence Luxe Hero](https://images.unsplash.com/photo-1583468982228-19f19164aee2?auto=format&fit=crop&q=80&w=1200)

## ✨ Key Features

- **Dynamic Collections**: Browse our curated catalog with real-time filtering by category (Floral, Woody, Oriental, etc.) and price range.
- **Advanced Sorting**: Organize scents by price, name, or the latest arrivals.
- **Interactive Product Pages**:
  - High-resolution image galleries with thumbnail navigation arrows.
  - Dynamic pricing based on bottle size selection.
  - Customer review system with real-time submission.
- **Personalized Wishlist**: Save your favorite fragrances to a dedicated wishlist page.
- **Social Sharing**: Built-in modal for quick sharing to Twitter, Facebook, or copying direct links.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, React Router 7.
- **Styling**: Tailwind CSS for a utility-first, elegant design.
- **Backend**: Simulated RESTful API (Mock Service) for ultra-fast data retrieval and state persistence.
- **Imagery**: Curated high-fidelity assets from Unsplash.

## 🚀 Getting Started

1. **Prerequisites**: Ensure you have a modern browser. No external database setup is required for this demo as it uses an in-memory mock backend.
2. **Architecture**:
   - `services/api.ts`: Contains the Mock Database and REST-like logic.
   - `pages/Home.tsx`: Handles product discovery and dynamic filtering.
   - `pages/ProductPage.tsx`: Manages detailed product state and user reviews.

## 📡 API Endpoints (Simulated)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/products` | Fetch all products with optional filters (`?q`, `?category`, `?minPrice`) |
| `GET` | `/api/v1/products/:id` | Get detailed information for a specific product |
| `GET` | `/api/v1/products/:id/reviews` | Retrieve customer reviews for a product |
| `POST` | `/api/v1/products/:id/reviews` | Submit a new customer review |

## 🎨 UI/UX Philosophy

The design utilizes a **Stone/Minimalist** palette to allow the product photography to shine. Serif typography (**Playfair Display**) is used for headings to evoke a sense of tradition and luxury, while **Inter** (Sans-Serif) handles UI elements for maximum readability.
