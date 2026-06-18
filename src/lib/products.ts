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
  name: "Vye Coconut Water",
  size: "1 L / 33.8 fl. oz.",
  pack: "6-pack",
  ingredients: "Organic Coconut Water",
  image: "/vyeBottle.png",
  priceCents: 4795,
  priceLabel: "$47.95",
};

export const products = [vyeProduct];
