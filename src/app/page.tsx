import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { vyeProduct } from "@/lib/products";

const benefits = [
  {
    title: "Made from young coconuts",
    copy: "Selected for a naturally light, clean taste with gentle coconut sweetness.",
    icon: "/coconut_icon.png",
  },
  {
    title: "Naturally hydrating",
    copy: "A refreshing source of electrolytes for daily replenishment.",
    icon: "/hydration.png",
  },
  {
    title: "Organic & plant based",
    copy: "Grown simply, bottled thoughtfully.",
    icon: "/plantbased.png",
  },
  {
    title: "Ethically sourced",
    copy: "Sourced with care from growers who help bring Vye's coconut water from grove to bottle.",
    icon: "/ethical.png",
  },
];

const certifications = [
  {
    name: "USDA Organic",
    image: "/usdaorganic.png",
    width: 840,
    height: 488,
  },
  {
    name: "Star-K Kosher",
    image: "/star-kosher.png",
    width: 320,
    height: 320,
  },
  {
    name: "Halal certified",
    image: "/halal-ribbon.png",
    width: 800,
    height: 800,
  },
  {
    name: "Non-GMO Project Verified",
    image: "/non-gmo-logo.jpg",
    width: 400,
    height: 293,
  },
];

export default function Home() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,var(--color-coconut-cream)_15%,var(--color-soft-water)_30%,#ffffff_48%,rgba(242,112,153,0.12)_68%,#ffffff_86%)]">
      <section className="relative overflow-x-clip bg-[#f9c8d8]">
        <Image
          src="/palm_beach.jpeg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,215,227,0.88)_0%,rgba(249,200,216,0.82)_48%,rgba(246,220,229,0.9)_100%)]" />
        <div className="absolute -right-16 top-12 size-52 rounded-full bg-[radial-gradient(circle_at_38%_35%,rgba(255,255,255,0.62),rgba(255,255,255,0.22)_72%)] blur-[1px] sm:-right-8 sm:size-72" />
        <div className="absolute -left-16 bottom-10 z-10 size-40 rounded-full bg-[radial-gradient(circle_at_58%_38%,rgba(168,207,90,0.5),rgba(168,207,90,0.2)_74%)] blur-[1px] sm:-left-12 sm:size-60" />
        <div className="absolute left-[46%] top-10 size-28 rounded-full bg-[radial-gradient(circle_at_38%_35%,rgba(255,255,255,0.48),rgba(255,255,255,0.14)_72%)] blur-[2px] sm:size-44" />
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-b from-transparent via-[#f9c8d8]/75 to-[#f9c8d8] sm:h-[28rem]" />
        <div className="relative mx-auto grid max-w-7xl gap-9 px-5 pb-18 pt-14 sm:gap-14 sm:px-8 sm:pb-28 sm:pt-20 md:pb-32 md:pt-28 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="relative z-10 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-palm-green sm:mb-5 sm:text-sm sm:tracking-[0.2em]">
              organic coconut water
            </p>
            <h1 className="text-4xl font-black leading-[1.04] tracking-normal text-near-black sm:text-6xl sm:leading-[1.02] lg:text-6xl">
              The hydration your body is vying for.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-near-black/68 sm:mt-7 sm:text-xl sm:leading-8">
              Organic coconut water made to refresh, replenish, and keep things
              naturally simple.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Button href="/shop" className="w-full sm:w-auto">
                Drink Vye
              </Button>
              <Button
                href="/find-us"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Find Us
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5 opacity-80 sm:justify-start">
              {certifications.map((certification) => (
                <div
                  key={certification.name}
                  className="flex h-10 w-14 items-center justify-center sm:h-12 sm:w-16"
                  title={certification.name}
                >
                  <Image
                    src={certification.image}
                    alt={certification.name}
                    width={certification.width}
                    height={certification.height}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_6px_12px_rgba(31,41,51,0.1)]"
                    sizes="64px"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-30">
            <div className="relative mx-auto h-[350px] w-full max-w-[380px] overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/82 p-4 shadow-[0_18px_46px_rgba(31,41,51,0.16)] sm:h-[500px] sm:max-w-[500px] sm:rounded-[2rem] sm:p-7 sm:shadow-[0_24px_70px_rgba(31,41,51,0.18)]">
              <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-white via-coconut-cream/75 to-white sm:rounded-[1.5rem]">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_78%,rgba(168,207,90,0.24),transparent_46%)]" />

                {/* Decorative frond layer */}

                <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[1.15rem] sm:rounded-[1.5rem]">

                  <Image

                    src="/palm.png"

                    alt=""

                    width={2550}

                    height={1700}

                    priority

                    className="palm-frond palm-frond-one absolute left-[68%] top-[76%] w-[390px] max-w-none grayscale opacity-20 mix-blend-multiply sm:left-[66%] sm:top-[73%] sm:w-[590px] sm:opacity-[0.18]"

                    sizes="(min-width: 1024px) 560px, 520px"

                  />

                  <Image

                    src="/palm.png"

                    alt=""

                    width={2550}

                    height={1700}

                    priority

                    className="palm-frond palm-frond-two absolute left-[82%] top-[64%] w-[410px] max-w-none grayscale opacity-[0.16] mix-blend-multiply sm:left-[76%] sm:top-[59%] sm:w-[620px] sm:opacity-[0.14]"

                    sizes="(min-width: 1024px) 590px, 540px"

                  />

                </div>

                {/* Bottle separation glow */}

                <div className="absolute left-1/2 top-1/2 z-20 h-52 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/75 blur-3xl sm:h-80 sm:w-60" />

                <div className="absolute left-1/2 top-[58%] z-20 h-24 w-36 -translate-x-1/2 rounded-full bg-coconut-green/30 blur-2xl sm:top-[58%] sm:h-36 sm:w-52" />

                {/* Bottle */}

                <div className="relative z-30 flex h-full translate-y-3 items-center justify-center sm:translate-y-4">

                  <Image

                    src="/vyeBottle.png"

                    alt="Vye organic coconut water bottle"

                    width={1080}

                    height={810}

                    className="pointer-events-none h-[325px] w-auto max-w-none object-contain drop-shadow-[0_20px_32px_rgba(36,90,53,0.24)] sm:h-[460px] sm:drop-shadow-[0_28px_42px_rgba(36,90,53,0.26)]"

                    sizes="(min-width: 1024px) 430px, 86vw"

                    priority

                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#f9c8d8_0%,rgba(249,200,216,0.68)_22%,rgba(251,215,227,0.3)_58%,#ffffff_100%)] px-5 py-20 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
          <div className="absolute -top-24 right-[18%] size-44 rounded-full bg-[radial-gradient(circle_at_38%_34%,rgba(168,207,90,0.48),rgba(168,207,90,0.2)_74%)] blur-[1px] sm:-top-55 sm:size-64 top-36" />
          <div className="absolute -top-10 left-[43%] size-24 rounded-full bg-[radial-gradient(circle_at_34%_30%,rgba(255,184,205,0.5)_0%,rgba(243,111,152,0.42)_50%,rgba(233,95,139,0.28)_100%)] shadow-[0_18px_42px_rgba(243,111,152,0.12)] blur-[0.8px] sm:size-36" />
          <div className="absolute left-[8%] top-20 size-20 rounded-full bg-[radial-gradient(circle_at_36%_32%,rgba(255,255,255,0.68),rgba(255,255,255,0.28)_76%)] blur-[1px] sm:left-[12%] sm:top-28 sm:size-28" />
        </div>
        <div className="relative z-30 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="relative min-h-[360px] overflow-hidden rounded-[2.5rem] bg-coconut-cream shadow-[0_24px_70px_rgba(36,90,53,0.12)] sm:min-h-[500px]">
              <Image
                src="/mekong_market.jpeg"
                alt="Floating market in Vietnam's Mekong Delta"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-normal text-near-black sm:text-5xl">
              From the Mekong Delta to your daily refresh.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-near-black/68">
              Our organic coconuts are sourced from Vietnam&apos;s lush Mekong Delta,
              where tropical waterways, fertile soil, and warm sun help create
              coconut water that tastes naturally clean, crisp, and refreshing.
            </p>
            <Link
              href="/our-coconuts"
              className="mt-9 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.16em] text-palm-green transition hover:text-vye-pink"
            >
              Explore Our Coconuts
              <span aria-hidden="true" className="text-vye-pink">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-white to-vye-pink/15 px-5 py-18 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-black tracking-normal text-near-black sm:text-4xl">
              Fresh by nature, polished by design.
            </h2>
            <p className="mt-4 text-base leading-7 text-near-black/65">
              Vye keeps hydration focused on what matters: quality coconuts,
              refreshing taste, and an ingredient list that stays easy to read.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-3xl border border-palm-green/10 bg-white p-6 shadow-[0_16px_40px_rgba(31,41,51,0.06)]"
              >
                <div className="relative mb-6 size-14 rounded-full bg-vye-pink/14 ring-8 ring-coconut-cream">
                  <Image
                    src={benefit.icon}
                    alt=""
                    width={64}
                    height={64}
                    className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_8px_14px_rgba(36,90,53,0.12)]"
                  />
                </div>
                <h3 className="text-lg font-black tracking-normal text-palm-green">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-near-black/64">
                  {benefit.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <section className="relative from-white via-vye-pink/45 px-5 py-18 sm:px-8 sm:py-24">
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div className="order-2 rounded-[2rem] bg-white p-5 shadow-[0_18px_55px_rgba(31,41,51,0.08)] lg:order-1">
            <div className="rounded-[1.5rem] border border-palm-green/10 bg-coconut-cream p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-vye-pink">
                spotlight
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-normal text-near-black sm:text-4xl">
                Organic Coconut Water
              </h2>
              <div className="mt-8 grid gap-3 text-sm text-near-black/70">
                <div className="rounded-2xl bg-white px-5 py-4">
                  Ingredients: {vyeProduct.ingredients}
                </div>
                <div className="rounded-2xl bg-white px-5 py-4">
                  Nutrition: Naturally occurring electrolytes
                </div>
                <div className="rounded-2xl bg-white px-5 py-4">
                  Pack: {vyeProduct.pack} of {vyeProduct.size}
                </div>
                <div className="rounded-2xl bg-white px-5 py-4">
                  Price: {vyeProduct.priceLabel}
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black leading-tight tracking-normal text-near-black">
              One crisp coconut water for everyday refreshment.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-near-black/66">
              Built around a single hero product, Vye is easy to stock, easy to
              shop, and ready for a future checkout integration when the store
              goes live.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/shop">Drink Vye</Button>
              <Button href="/contact" variant="secondary">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-18 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-coconut-green text-white p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
              our coconuts
            </p>
            <h2 className="mt-4 text-3xl text-white font-black tracking-normal text-near-black">
              Organic sourcing with a clean, tropical profile.
            </h2>
            <p className="mt-5 text-base leading-7 text-near-black/66">
              Vye centers young coconuts, careful quality standards, and a
              light taste that feels fresh without leaning sugary.
            </p>
            <Button
              href="/our-coconuts"
              variant="secondary"
              className="mt-8 w-full lg:w-auto"
            >
              Our Coconuts
            </Button>
          </article>

          <article className="rounded-[2rem] bg-vye-pink p-8 text-white sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-soft-water">
              find us
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal">
              Stockists, markets, and chilled shelves coming soon.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/74">
              The store finder is ready for retail partners, zip search, and
              regional availability as Vye expands.
            </p>
            <Button
              href="/find-us"
              variant="secondary"
              className="mt-8 w-full lg:w-auto"
            >
              Find Us
            </Button>
          </article>
        </div>
      </section >
    </div >
  );
}
