import { Order } from "@/types";
import { products } from "@/data/products";

const p = (slug: string) => products.find((x) => x.slug === slug)!;

export const orders: Order[] = [
  {
    id: "SH-10482",
    date: "2026-07-02",
    status: "Delivered",
    items: [
      {
        productId: p("noir-de-velours").id,
        name: p("noir-de-velours").name,
        image: p("noir-de-velours").images[0],
        price: p("noir-de-velours").price,
        quantity: 1,
      },
      {
        productId: p("citron-de-cote").id,
        name: p("citron-de-cote").name,
        image: p("citron-de-cote").images[0],
        price: p("citron-de-cote").price,
        quantity: 1,
      },
    ],
    total: 425,
  },
  {
    id: "SH-10321",
    date: "2026-06-11",
    status: "Shipped",
    items: [
      {
        productId: p("discovery-collection").id,
        name: p("discovery-collection").name,
        image: p("discovery-collection").images[0],
        price: p("discovery-collection").price,
        quantity: 1,
      },
    ],
    total: 120,
  },
  {
    id: "SH-10188",
    date: "2026-05-20",
    status: "Processing",
    items: [
      {
        productId: p("oud-imperial").id,
        name: p("oud-imperial").name,
        image: p("oud-imperial").images[0],
        price: p("oud-imperial").price,
        quantity: 1,
      },
    ],
    total: 340,
  },
];
