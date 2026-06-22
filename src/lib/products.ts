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

export const vyeProductSpecifications = [
  { label: "Packaging", value: "1L Tetra Pak" },
  { label: "Unit Size", value: "1 Liter (33.8 fl oz)" },
  { label: "Case Pack", value: "6 × 1L" },
  {
    label: "Unit Dimensions",
    value: "2.76 × 2.76 × 9.40 in (W × D × H)",
  },
  {
    label: "Master Case Dimensions",
    value: "9.64 × 6.25 × 10.00 in (L × W × H)",
  },
  { label: "Gross Weight", value: "14.99 lbs" },
  { label: "Units per Pallet", value: "168 cases (1,008 units)" },
  { label: "Pallet Configuration", value: "TI: 28 × HI: 6" },
  { label: "Shelf Life", value: "12 months" },
  { label: "Country of Origin", value: "Vietnam" },
];

export const vyeProductStorage = {
  unopened: "Store unopened cartons in a cool, dry place.",
  opened: "Refrigerate after opening.",
};
