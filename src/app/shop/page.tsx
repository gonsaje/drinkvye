import Image from "next/image";
import { Button } from "@/components/Button";

const details = [
  { label: "Product", value: "Organic Coconut Water" },
  { label: "Size", value: "11.2 fl oz" },
  { label: "Ingredients", value: "organic coconut water" },
  { label: "Checkout", value: "coming soon" },
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
      <section className="relative bg-gradient-to-b from-white via-coconut-cream/80 to-soft-water/45 px-5 pb-28 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1fr] lg:items-center">
          <div className="rounded-[2rem] bg-coconut-cream p-6 shadow-[0_24px_70px_rgba(36,90,53,0.1)]">
            <div className="flex min-h-[460px] items-center justify-center rounded-[1.5rem] bg-white">
              <div className="relative h-[420px] w-full max-w-md">
                <Image
                  src="/vyeBottle.png"
                  alt="Vye organic coconut water bottle"
                  fill
                  priority
                  className="scale-125 object-contain drop-shadow-[0_24px_38px_rgba(36,90,53,0.2)]"
                  sizes="(min-width: 1024px) 430px, 86vw"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-vye-pink">
              drink vye
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal text-near-black sm:text-6xl">
              Organic Coconut Water
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-near-black/68">
              Light, clean coconut water for everyday refreshment.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-3xl border border-palm-green/10 bg-coconut-cream px-5 py-4"
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

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/find-us">Find Us</Button>
              <Button href="/contact" variant="secondary">
                Wholesale Contact
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-soft-water/45 via-soft-water/30 to-white px-5 py-18 sm:px-8 sm:py-24">
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
