import { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    author: "Camille R.",
    rating: 5,
    title: "Utterly hypnotic",
    content:
      "The oud is smooth, never sharp, and the amber base lasts well into the next day on my scarf. Worth every penny.",
    date: "2026-05-12",
    verified: true,
  },
  {
    id: "r2",
    productId: "1",
    author: "David K.",
    rating: 5,
    title: "Compliment magnet",
    content:
      "I've had three strangers stop me to ask what I'm wearing. That never happens.",
    date: "2026-04-02",
    verified: true,
  },
  {
    id: "r3",
    productId: "2",
    author: "Ana P.",
    rating: 4,
    title: "Elegant and soft",
    content:
      "Beautiful white florals, very wearable for the office. Wish the longevity was a touch longer.",
    date: "2026-03-21",
    verified: true,
  },
  {
    id: "r4",
    productId: "7",
    author: "Marcus T.",
    rating: 5,
    title: "Museum-quality",
    content:
      "This smells like it costs three times as much. The numbered bottle is a lovely touch too.",
    date: "2026-06-01",
    verified: true,
  },
  {
    id: "r5",
    productId: "9",
    author: "Sofia L.",
    rating: 5,
    title: "My signature now",
    content:
      "Dark, moody, a little dangerous. Exactly what I wanted from a rose fragrance.",
    date: "2026-02-14",
    verified: true,
  },
];

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    author: "Isabelle M.",
    location: "Paris, FR",
    quote:
      "HUSSAIN feels like walking into an atelier rather than a store. Every bottle feels considered.",
    rating: 5,
  },
  {
    id: "t2",
    author: "James O.",
    location: "London, UK",
    quote:
      "The Discovery Collection sold me on three full bottles within a month. Dangerous, in the best way.",
    rating: 5,
  },
  {
    id: "t3",
    author: "Noor H.",
    location: "Dubai, AE",
    quote:
      "Packaging alone feels like a luxury unboxing. The fragrances hold up long after the excitement wears off.",
    rating: 5,
  },
  {
    id: "t4",
    author: "Lucía F.",
    location: "Madrid, ES",
    quote:
      "Fast shipping, thoughtful notes on every card, and Rose Noire is now permanently in my bag.",
    rating: 4,
  },
];
