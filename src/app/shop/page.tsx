import Image from "next/image";
import { AddToCart } from "@/components/AddToCart";
import { Button } from "@/components/Button";
import { ProductAccordion } from "@/components/ProductAccordion";
import { ProductImageCarousel } from "@/components/ProductImageCarousel";
import {
  vyeProduct,
  vyeProductSpecifications,
  vyeProductStorage,
} from "@/lib/products";

const details = [
  { label: "Bottle size", value: vyeProduct.size },
  { label: "Ingredients", value: vyeProduct.ingredients },
];

const customerProductSpecifications = vyeProductSpecifications.filter(
  (specification) =>
    !["Units per Pallet", "Pallet Configuration", "Shelf Life"].includes(
      specification.label,
    ),
);

const certifications = [
  {
    name: "USDA Organic",
    image: "/usdaorganic.png",
    width: 840,
    height: 488,
  },
  {
    name: "Kosher",
    image: "/star-kosher.png",
    width: 320,
    height: 320,
  },
  {
    name: "Halal",
    image: "/halal-ribbon.png",
    width: 800,
    height: 800,
  },
  {
    name: "Non-GMO Verified",
    image: "/non-gmo-logo.jpg",
    width: 400,
    height: 293,
  },
];

const keyFeatures = [
  "USDA Organic Certified",
  "Not from Concentrate (NFC)",
  "Product of Vietnam",
  "Naturally Rich in Electrolytes",
  "No Added Sugar",
];

const nutritionFacts = [
  { nutrient: "Calories", amount: "45 kcal" },
  { nutrient: "Total Fat", amount: "0 g" },
  { nutrient: "Saturated Fat", amount: "0 g" },
  { nutrient: "Trans Fat", amount: "0 g" },
  { nutrient: "Cholesterol", amount: "0 mg" },
  { nutrient: "Sodium", amount: "50 mg" },
  { nutrient: "Total Carbohydrates", amount: "11 g" },
  { nutrient: "Dietary Fiber", amount: "0 g" },
  { nutrient: "Total Sugars", amount: "9 g" },
  { nutrient: "Added Sugars", amount: "0 g" },
  { nutrient: "Protein", amount: "0 g" },
  { nutrient: "Vitamin D", amount: "0 mcg" },
  { nutrient: "Calcium", amount: "40 mg" },
  { nutrient: "Iron", amount: "0 mg" },
  { nutrient: "Potassium", amount: "560 mg" },
];

export default function DrinkVyePage() {
  return (
    <div className="bg-[linear-gradient(180deg,#ffffff_0%,var(--color-coconut-cream)_34%,rgba(223,245,247,0.55)_72%,#ffffff_100%)]">
      <section className="relative bg-gradient-to-b from-white via-coconut-cream/80 to-vye-pink/25 px-4 pb-16 pt-12 sm:px-8 sm:pb-32 sm:pt-28">
        <div className="relative mx-auto grid max-w-7xl gap-9 sm:gap-14 lg:grid-cols-2 lg:items-stretch">
          <ProductImageCarousel />


          <div className="flex h-full flex-col">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-vye-pink">
              drink vye
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-normal text-near-black sm:mt-5 sm:text-6xl">
              Vye Coconut Water
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-near-black/68 sm:mt-6 sm:text-lg sm:leading-8">
              Light, clean coconut water for everyday refreshment, sold as a
              six-pack of 1 liter bottles.
            </p>

            <p className="mt-4 text-base font-bold text-palm-green">
              {vyeProduct.priceLabel}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-palm-green/10 bg-coconut-cream px-4 py-4 sm:rounded-3xl sm:px-5"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-palm-green/70">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-base font-bold text-near-black">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            <AddToCart />

            <div className="mt-auto grid gap-3 pt-5 sm:flex sm:flex-row">
              <Button href="/find-us" className="w-full sm:w-auto">
                Find Us
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Wholesale Contact
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-vye-pink/25 px-5 pb-18 sm:px-8 sm:pb-24">
        <div className="pointer-events-none absolute -right-24 top-8 size-72 rounded-full bg-white/45 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 size-64 rounded-full bg-coconut-green/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(31,41,51,0.08)] sm:p-9">
            <p className="inline-flex rounded-full bg-vye-pink px-5 py-2 text-sm font-black uppercase tracking-[0.18em] text-white">
              Key Features
            </p>
            <ul className="mt-7 grid gap-4">
              {keyFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-4 text-base font-bold leading-7 text-near-black sm:text-lg"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-coconut-green/28 text-sm font-black text-palm-green"
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-[2rem] border border-white/75 bg-white/68 p-6 shadow-[0_20px_60px_rgba(31,41,51,0.07)] backdrop-blur-sm sm:p-9">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-palm-green">
                Certified standards
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-normal text-near-black sm:text-4xl">
                Recognized quality you can see.
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {certifications.map((certification) => (
                <div
                  key={certification.name}
                  className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl bg-white p-4 text-center shadow-[0_12px_30px_rgba(31,41,51,0.07)] ring-1 ring-palm-green/8"
                >
                  <div className="relative size-20">
                    <Image
                      src={certification.image}
                      alt={certification.name}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                  <p className="text-xs font-black leading-5 text-palm-green">
                    {certification.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-vye-pink/25 px-5 sm:px-8 ">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
              product details
            </p>
            {/* <h2 className="mt-3 text-3xl font-black tracking-normal text-near-black sm:text-4xl">
              Everything you need to know.
            </h2> */}
          </div>

          <div className="overflow-hidden rounded-3xl border border-palm-green/12 bg-white shadow-[0_16px_42px_rgba(31,41,51,0.06)]">
            <ProductAccordion title="Product Specifications">
              <dl className="px-5 py-2 sm:px-6">
                {customerProductSpecifications.map((specification) => (
                  <div
                    key={specification.label}
                    className="grid gap-1 border-b border-palm-green/8 py-4 last:border-b-0 sm:grid-cols-[0.42fr_0.58fr] sm:gap-6"
                  >
                    <dt className="text-sm font-bold text-palm-green/72">
                      {specification.label}
                    </dt>
                    <dd className="text-sm font-semibold leading-6 text-near-black">
                      {specification.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </ProductAccordion>

            <ProductAccordion title="Product Storage" withTopBorder>
              <div className="grid gap-4 px-5 py-5 sm:px-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-vye-pink">
                    Before opening
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-near-black">
                    {vyeProductStorage.unopened}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-vye-pink">
                    After opening
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-near-black">
                    {vyeProductStorage.opened}
                  </p>
                </div>
              </div>
            </ProductAccordion>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-vye-pink/25 via-vye-pink/30 to-coconut-green/30 px-5 py-18 sm:px-8 sm:py-24">
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
              nutrition facts
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-near-black sm:text-4xl">
              Clean coconut water, clearly labeled.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-near-black/66">
              Serving size: 240 mL. Amounts per serving, from the product
              nutrition label or trusted public sources.
            </p>
          </div>

          <div className="bg-white p-6 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:p-8">
            <div className="border-b-[10px] border-near-black pb-3">
              <h3 className="text-4xl font-black leading-none tracking-normal text-near-black">
                Nutrition Facts
              </h3>
              <p className="mt-3 text-base font-bold text-near-black">
                Serving size 240 mL
              </p>
            </div>
            <div className="divide-y divide-near-black/18">
              {nutritionFacts.map((fact) => (
                <div
                  key={fact.nutrient}
                  className="grid grid-cols-[1fr_auto] gap-4 py-3 text-sm sm:text-base"
                >
                  <span className="font-bold text-near-black">
                    {fact.nutrient}
                  </span>
                  <span className="font-semibold text-near-black/78">
                    {fact.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
