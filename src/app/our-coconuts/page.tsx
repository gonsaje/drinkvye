import Image from "next/image";
import { Button } from "@/components/Button";

const standards = [
  "Young coconuts selected for a naturally clean flavor",
  "Organic growing standards with plant-based simplicity",
  "A light finish that avoids heavy sweetness",
];

const productStandards = [
  {
    label: "Organic",
    icon: "/usdaorganic.png",
  },
  {
    label: "Non-GMO",
    icon: "/NONGMO.png",
  },
  {
    label: "Vegan",
    icon: "/plantbased.png",
  },
  {
    label: "Kosher",
    icon: "/kosher.png",
  },
  {
    label: "No Added Sugar",
    icon: "/nonsugar.png",
  },
  {
    label: "Ethically sourced",
    icon: "/ethical.png",
  },
];

export default function OurCoconutsPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,var(--color-coconut-cream)_28%,#ffffff_58%,rgba(223,245,247,0.55)_100%)]">
      <section className="relative bg-gradient-to-b from-coconut-green/45 via-coconut-green/30 to-white px-5 pb-28 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-palm-green">
              our coconuts
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal text-near-black sm:text-6xl">
              Clean hydration starts with better coconuts.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-near-black/68">
              Vye is built around organic young coconut water: bright,
              replenishing, and intentionally simple from sourcing to shelf.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white bg-white p-6 shadow-[0_24px_70px_rgba(36,90,53,0.12)]">
            <div className="relative min-h-[390px] overflow-hidden rounded-[1.5rem] bg-soft-water">
              <Image
                src="/coconut_farmers.jpeg"
                alt="Fresh coconut with a straw"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-palm-green/18 via-transparent to-white/10" /> */}
              {/* <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-soft-water/85" /> */}
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-white px-5 py-18 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div className="order-2 flex justify-center lg:order-1">
            <div className="relative flex aspect-square w-64 items-center justify-center rounded-full bg-vye-pink/15 p-7 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:w-80">
              <div className="absolute inset-4 rounded-full bg-white/55 blur-3xl" />
              <Image
                src="/electrolytes.png"
                alt="Electrolytes graphic"
                width={449}
                height={463}
                className="relative h-[78%] w-[78%] object-contain"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-vye-pink">
              natural electrolytes
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-near-black sm:text-4xl">
              Rich in electrolytes.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-near-black/66">
              Young coconut water naturally contains electrolytes like
              potassium and sodium, helping Vye refresh and replenish while
              keeping the ingredient list clean and uncomplicated.
            </p>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[620px] items-center overflow-hidden bg-white px-5 py-28 sm:px-8 sm:py-36">
        <Image
          src="/coconut_tree.jpeg"
          alt=""
          fill
          className="object-cover opacity-55 [mask-image:linear-gradient(to_bottom,transparent_0%,black_18%,black_82%,transparent_100%)]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/78 via-white/48 to-white/58" />
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white via-white/58 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/86 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <h2 className="text-3xl font-black tracking-normal text-near-black">
              Quality that stays refreshing.
            </h2>
            <p className="mt-5 text-base leading-7 text-near-black/66">
              Organic coconut water should feel crisp, not crowded. Our
              sourcing story keeps the emphasis on young coconuts, organic
              standards, and a smooth coconut taste.
            </p>
          </div>
          <div className="grid gap-4">
            {standards.map((standard) => (
              <div
                key={standard}
                className="rounded-3xl border border-palm-green/10 bg-coconut-cream px-6 py-5 text-base font-semibold text-palm-green"
              >
                {standard}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white px-5 py-18 sm:px-8 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:grid lg:grid-cols-[1fr_0.7fr] lg:items-start">
          <div className="order-2 grid gap-3 sm:grid-cols-2 lg:order-1 lg:grid-cols-3">
            {productStandards.map((standard) => (
              <div
                key={standard.label}
                className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl bg-coconut-cream px-5 py-5 text-center text-base font-black text-palm-green shadow-[0_12px_28px_rgba(31,41,51,0.05)]"
              >
                <Image
                  src={standard.icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-14 w-14 object-contain"
                />
                <span>{standard.label}</span>
              </div>
            ))}
          </div>

          <div className="order-1 lg:order-2 lg:pl-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-vye-pink">
              product standards
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-near-black">
              Simple by standard.
            </h2>
            <p className="mt-5 text-base leading-7 text-near-black/66">
              Vye keeps the formula focused on organic coconut water with clean
              label standards that are easy to understand.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-white via-vye-pink/25 to-vye-pink/45 px-5 py-18 sm:px-8 sm:py-24">
        <div className="relative mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-normal text-near-black">
              Ready for the bottle?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-near-black/66">
              Meet the first Vye coconut water and the product details prepared
              for future ecommerce.
            </p>
          </div>
          <div className="relative h-52 w-52 justify-self-center md:h-60 md:w-60">
            <Image
              src="/vyeBottle.png"
              alt="Vye organic coconut water bottle"
              fill
              className="scale-125 object-contain drop-shadow-[0_20px_30px_rgba(36,90,53,0.18)]"
              sizes="240px"
            />
          </div>
          <Button href="/shop">Drink Vye</Button>
        </div>
      </section>
    </div>
  );
}
