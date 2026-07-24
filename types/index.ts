export type Category = "mens" | "womens" | "unisex" | "luxury" | "gift-sets";

export type Concentration = "Eau de Toilette" | "Eau de Parfum" | "Parfum";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating";

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandLine: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  size: string;
  concentration: Concentration;
  images: string[];
  shortDescription: string;
  description: string;
  notes: FragranceNotes;
  rating: number;
  reviewCount: number;
  bestSeller?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified?: boolean;
}

export type OrderStatus = "Processing" | "Shipped" | "Delivered";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}
