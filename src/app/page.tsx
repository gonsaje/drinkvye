import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { MobileHeroScrollCue } from "@/components/MobileHeroScrollCue";
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
    name: "Kosher",
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
      <section className="relative min-h-[760px] overflow-hidden bg-[#f9c8d8] min-[430px]:min-h-[800px] sm:min-h-[max(430px,41.92vw)]">
        <Image
          src="/vye_main_mobile.png"
          alt="Vye coconut water with coconut and glass on a pink tropical background"
          fill
          priority
          className="object-cover object-center sm:hidden"
          sizes="100vw"
        />
        <Image
          src="/vye_main.png"
          alt="Vye coconut water with coconut and glass on a pink tropical background"
          fill
          priority
          className="hidden object-cover object-[62%_center] sm:block"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,246,249,0.92)_0%,rgba(255,246,249,0.64)_25%,rgba(255,246,249,0.18)_44%,rgba(255,246,249,0)_64%)] sm:bg-[linear-gradient(90deg,rgba(255,248,237,0.9)_0%,rgba(255,241,246,0.78)_34%,rgba(255,241,246,0.32)_56%,rgba(255,241,246,0.02)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#f9c8d8]/18 to-[#f9c8d8] sm:h-32 sm:via-[#f9c8d8]/38" />
        <div className="relative mx-auto flex min-h-[760px] w-full max-w-7xl flex-col justify-between px-5 pb-6 pt-20 min-[430px]:min-h-[800px] sm:min-h-[max(430px,41.92vw)] sm:justify-center sm:px-8 sm:pb-28 sm:pt-24 md:pb-32 md:pt-28">
          <div className="relative z-10 mx-auto min-w-0 max-w-[22rem] text-center sm:mx-0 sm:max-w-2xl sm:text-left">
            <h1 className="max-w-full text-[2.7rem] font-black uppercase leading-[1.03] tracking-normal text-palm-green max-[390px]:text-[2.5rem] sm:text-6xl sm:leading-[1.02] lg:text-6xl">
              <span className="block sm:inline">
                The{" "}
                <span className="text-vye-pink drop-shadow-[0_0_16px_rgba(243,111,152,0.36)]">
                  Pink
                </span>{" "}
                Of
              </span>{" "}
              <span className="block sm:inline">Hydration</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[17rem] text-[1.45rem] font-medium leading-[1.28] text-near-black/72 max-[390px]:text-[1.32rem] sm:mx-0 sm:mt-7 sm:max-w-xl sm:text-xl sm:font-semibold sm:leading-8">
              Finally, coconut water you&apos;ll actually crave.
            </p>
            <div className="mt-10 hidden max-w-full gap-3 sm:flex sm:flex-row">
              <Button
                href="/shop"
                className="w-full max-w-full rounded-full border-2 border-vye-pink bg-vye-pink px-4 text-white shadow-[0_16px_32px_rgba(243,111,152,0.22)] hover:bg-transparent hover:text-vye-pink hover:shadow-none sm:w-auto sm:px-8"
              >
                Discover Vye
              </Button>
              <Button
                href="/find-us"
                variant="secondary"
                className="w-full max-w-full rounded-full border-2 border-palm-green bg-palm-green px-4 text-vye-pink shadow-[0_16px_32px_rgba(36,90,53,0.18)] hover:bg-transparent hover:text-palm-green hover:shadow-none sm:w-auto sm:px-8"
              >
                Find Us
              </Button>
            </div>
            <div className="mt-10 hidden max-w-full flex-wrap items-center justify-center gap-5 opacity-80 max-[390px]:gap-3 sm:flex sm:justify-start">
              {certifications.map((certification) => (
                <div
                  key={certification.name}
                  className="flex h-10 w-14 items-center justify-center max-[390px]:h-9 max-[390px]:w-12 sm:h-12 sm:w-16"
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
          <div className="relative z-10 sm:hidden">
            <div className="grid max-w-full grid-cols-2 gap-4">
              <Button
                href="/shop"
                className="min-h-[52px] w-full max-w-full rounded-full border border-white/70 bg-vye-pink px-3 text-base text-white shadow-[0_12px_24px_rgba(243,111,152,0.18)] hover:border-vye-pink hover:bg-transparent hover:text-vye-pink hover:shadow-none"
              >
                Discover Vye
              </Button>
              <Button
                href="/find-us"
                variant="secondary"
                className="min-h-[52px] w-full max-w-full rounded-full border border-vye-pink/70 bg-white/94 px-3 text-base text-vye-pink shadow-[0_12px_24px_rgba(243,111,152,0.1)] hover:border-vye-pink hover:bg-transparent hover:text-vye-pink hover:shadow-none"
              >
                Find Us
              </Button>
            </div>
            <div className="mt-3 flex max-w-full items-center justify-center gap-6 opacity-90 max-[390px]:gap-5">
              {certifications.map((certification) => (
                <div
                  key={certification.name}
                  className="flex h-12 w-12 items-center justify-center max-[390px]:h-10 max-[390px]:w-10"
                  title={certification.name}
                >
                  <Image
                    src={certification.image}
                    alt={certification.name}
                    width={certification.width}
                    height={certification.height}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_6px_12px_rgba(31,41,51,0.1)]"
                    sizes="48px"
                  />
                </div>
              ))}
            </div>
            <MobileHeroScrollCue targetId="mekong-section" />
          </div>
        </div>
      </section>

      <section
        id="mekong-section"
        className="relative -mt-px scroll-mt-4 bg-[linear-gradient(180deg,#f9c8d8_0%,rgba(249,200,216,0.68)_22%,rgba(251,215,227,0.3)_58%,#ffffff_100%)] px-5 pb-20 pt-24 sm:scroll-mt-0 sm:px-8 sm:py-28"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
          <div className="absolute hidden rounded-full bg-[radial-gradient(circle_at_38%_34%,rgba(168,207,90,0.42),rgba(168,207,90,0.18)_74%)] blur-[1px] sm:-right-14 sm:-top-19 sm:block sm:size-52" />
          <div className="absolute hidden rounded-full bg-[radial-gradient(circle_at_34%_30%,rgba(255,184,205,0.48)_0%,rgba(243,111,152,0.38)_50%,rgba(233,95,139,0.22)_100%)] shadow-[0_18px_42px_rgba(243,111,152,0.12)] blur-[0.8px] sm:left-[10%] sm:top-0 sm:block sm:size-32" />
          <div className="absolute hidden rounded-full bg-[radial-gradient(circle_at_36%_32%,rgba(255,255,255,0.62),rgba(255,255,255,0.24)_76%)] blur-[1px] sm:left-[48%] sm:top-24 sm:block sm:size-24" />
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
