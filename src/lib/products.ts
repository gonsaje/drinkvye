export type Product = {
  id: string;
  name: string;
  size: string;
  pack: string;
  ingredients: string;
  image: string;
  priceCents: number;
  priceLabel: string;
};

export const vyeProduct: Product = {
  id: "vye-organic-coconut-water",
  name: "Organic Coconut Water",
  size: "1 liter bottles",
  pack: "6-pack",
  ingredients: "organic coconut water",
  image: "/vyeBottle.png",
  priceCents: 4795,
  priceLabel: "$47.95 / 6-pack",
};

export const products = [vyeProduct];
