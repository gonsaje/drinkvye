import type { Metadata } from "next";
import { WholesaleForm } from "@/components/WholesaleForm";

export const metadata: Metadata = {
  title: "Wholesale | Vye Organic Coconut Water",
  description:
    "Apply to carry Vye organic coconut water in your store, café, gym, restaurant, or hospitality business.",
};

const wholesaleBenefits = [
  "Organic, single-ingredient coconut water",
  "Retail-ready 1-liter bottles in 6-packs",
  "Support for stores, cafés, gyms, hospitality, and distribution",
  "Responsive wholesale ordering assistance",
];

export default function WholesalePage() {
  return (
    <div className="bg-[linear-gradient(180deg,#f9d8e3_0%,var(--color-coconut-cream)_30%,#ffffff_58%,#fff4f8_82%,#fde8ef_100%)]">
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute -right-24 top-14 size-80 rounded-full bg-coconut-green/30 blur-2xl" />
        <div className="pointer-events-none absolute -left-24 bottom-24 size-72 rounded-full bg-vye-pink/14 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-vye-pink">
              wholesale
            </p>
            <h1 className="mt-5 text-5xl font-black leading-[1.02] tracking-normal text-near-black sm:text-6xl">
              Bring Vye to your customers.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-near-black/68">
              Interested in stocking Vye? Tell us about your business and where
              you would like to serve our organic coconut water.
            </p>

            <ul className="mt-9 grid gap-4">
              {wholesaleBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-base font-semibold leading-7 text-palm-green"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-2 shrink-0 rounded-full bg-coconut-green"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-3xl bg-palm-green px-6 py-6 text-white">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-coconut-green">
                Questions first?
              </p>
              <a
                href="mailto:info@drinkvye.com"
                className="mt-3 inline-block text-lg font-bold transition hover:text-vye-pink"
              >
                info@drinkvye.com
              </a>
            </div>
          </div>

          <WholesaleForm />
        </div>
      </section>
    </div>
  );
}
