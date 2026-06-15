import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";

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

export default function Home() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,var(--color-coconut-cream)_15%,var(--color-soft-water)_30%,#ffffff_48%,rgba(223,245,247,0.55)_68%,#ffffff_86%)]">
      <section className="relative overflow-hidden">
        <Image
          src="/palm_beach.jpeg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-coconut-cream/70 to-soft-water/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-coconut-cream/70 via-white/25 to-white/10" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-soft-water/70 to-soft-water" />
        <div className="absolute right-0 top-20 h-52 w-32 rounded-l-full bg-soft-water/70" />
        <div className="absolute bottom-16 left-0 h-36 w-20 rounded-r-full bg-vye-pink/20" />
        <div className="absolute left-1/2 top-14 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
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
          </div>

          <div className="relative z-10">
            <div className="relative mx-auto h-[330px] w-full max-w-[360px] overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/75 p-4 shadow-[0_18px_46px_rgba(36,90,53,0.13)] sm:h-[460px] sm:max-w-[460px] sm:overflow-visible sm:rounded-[2rem] sm:p-8 sm:shadow-[0_24px_70px_rgba(36,90,53,0.14)]">
              <div className="relative h-full overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-soft-water via-white/40 to-coconut-cream sm:overflow-visible sm:rounded-[1.5rem]">
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_78%,rgba(255,248,237,0.95),transparent_42%)]" />

                {/* Decorative frond layer */}

                <div className="pointer-events-none absolute -left-14 -top-10 bottom-0 right-0 z-10 overflow-hidden rounded-[1.15rem] sm:-left-24 sm:-top-16 sm:rounded-[1.5rem]">

                  <Image

                    src="/palm.png"

                    alt=""

                    width={2550}

                    height={1700}

                    priority

                    className="palm-frond palm-frond-one absolute left-[68%] top-[76%] w-[390px] max-w-none opacity-60 sm:left-[65%] sm:top-[72%] sm:w-[560px] sm:opacity-70"

                    sizes="(min-width: 1024px) 560px, 520px"

                  />

                  <Image

                    src="/palm.png"

                    alt=""

                    width={2550}

                    height={1700}

                    priority

                    className="palm-frond palm-frond-two absolute left-[82%] top-[64%] w-[410px] max-w-none opacity-48 sm:left-[75%] sm:top-[57%] sm:w-[590px] sm:opacity-60"

                    sizes="(min-width: 1024px) 590px, 540px"

                  />

                </div>

                {/* Bottle separation glow */}

                <div className="absolute left-1/2 top-1/2 z-20 h-52 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl sm:h-72 sm:w-52" />

                <div className="absolute left-1/2 top-[58%] z-20 h-24 w-36 -translate-x-1/2 rounded-full bg-coconut-cream/60 blur-2xl sm:top-[56%] sm:h-32 sm:w-44" />

                {/* Bottle */}

                <div className="relative z-30 flex h-full items-center justify-center">

                  <Image

                    src="/vyeBottle.png"

                    alt="Vye organic coconut water bottle"

                    width={1080}

                    height={810}

                    className="pointer-events-none h-[225px] w-auto max-w-none object-contain drop-shadow-[0_20px_32px_rgba(36,90,53,0.24)] sm:h-[315px] sm:drop-shadow-[0_28px_42px_rgba(36,90,53,0.26)]"

                    sizes="(min-width: 1024px) 430px, 86vw"

                    priority

                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-soft-water via-soft-water/25 to-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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

      <section className="relative px-5 py-18 sm:px-8 sm:py-24">
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

      <section className="relative from-white via-soft-water/45 px-5 py-18 sm:px-8 sm:py-24">
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center">
          <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_55px_rgba(31,41,51,0.08)]">
            <div className="rounded-[1.5rem] border border-palm-green/10 bg-coconut-cream p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-vye-pink">
                spotlight
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-normal text-near-black sm:text-4xl">
                Organic Coconut Water
              </h2>
              <div className="mt-8 grid gap-3 text-sm text-near-black/70">
                <div className="rounded-2xl bg-white px-5 py-4">
                  Size: 11.2 fl oz single serve
                </div>
                <div className="rounded-2xl bg-white px-5 py-4">
                  Ingredients: organic coconut water
                </div>
                <div className="rounded-2xl bg-white px-5 py-4">
                  Nutrition: naturally occurring electrolytes
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-black leading-tight tracking-normal text-near-black">
              One crisp coconut water for everyday refreshment.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-near-black/66">
              Built around a single hero product, Vye is easy to stock, easy to
              shop, and ready for a future checkout integration when the store
              goes live.
            </p>
            <Button href="/shop" className="mt-8">
              Drink Vye
            </Button>
          </div>
        </div>
      </section>

      <section className="px-5 py-18 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] bg-coconut-cream p-8 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
              our coconuts
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-near-black">
              Organic sourcing with a clean, tropical profile.
            </h2>
            <p className="mt-5 text-base leading-7 text-near-black/66">
              Vye centers young coconuts, careful quality standards, and a
              light taste that feels fresh without leaning sugary.
            </p>
            <Button href="/our-coconuts" variant="secondary" className="mt-8">
              Our Coconuts
            </Button>
          </article>

          <article className="rounded-[2rem] bg-palm-green p-8 text-white sm:p-10">
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
            <Button href="/find-us" variant="secondary" className="mt-8">
              Find Us
            </Button>
          </article>
        </div>
      </section >
    </div >
  );
}
