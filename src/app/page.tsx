import Image from "next/image";
import { Button } from "@/components/Button";
import { MobileHeroScrollCue } from "@/components/MobileHeroScrollCue";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";

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

const retailLogos = [
  {
    name: "Lincoln Market",
    image: "/lincoln_market.png",
    width: 456,
    height: 456,
    containerClassName: "h-20 sm:h-24",
    marqueeContainerClassName: "h-20 px-2",
    marqueeClassName: "max-w-[7rem]",
    className: "max-w-[12rem] sm:max-w-[14rem] lg:max-w-[15rem]",
  },
  {
    name: "Foodtown",
    image: "/foodtown.png",
    width: 1280,
    height: 375,
  },
  {
    name: "Key Food",
    image: "/keyfood.png",
    width: 1272,
    height: 513,
  },
  {
    name: "Dumbo Market",
    image: "/dumbo_market.png",
    width: 604,
    height: 280,
  },
  {
    name: "Old Nelson",
    image: "/oldnelson.png",
    width: 1200,
    height: 627,
  },
];

export default function Home() {
  return (
    <div className="bg-[linear-gradient(180deg,#f9c8d8_0%,#f9c8d8_28%,#fff7fa_42%,#ffffff_58%,#ffffff_70%,#fff4f8_84%,#fde8ef_100%)]">
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
            <h1 className="font-vye-display max-w-full text-[3.2rem] leading-[0.98] tracking-normal text-palm-green max-[390px]:text-[3rem] sm:text-7xl sm:leading-[0.95] lg:text-8xl">
              Nature&apos;s Hydration Perfected
            </h1>
            <p className="mx-auto mt-5 max-w-[17rem] text-[1.35rem] font-medium leading-[1.28] text-near-black max-[390px]:text-[1.32rem] sm:mx-0 sm:mt-4 sm:max-w-xl sm:text-xl sm:font-semibold sm:leading-8">
              Hydrate Better, Live Better
            </p>
            <div className="mt-10 hidden max-w-full gap-3 sm:flex sm:flex-row">
              <Button
                href="/shop"
                className="w-full max-w-full rounded-full border-2 border-vye-pink bg-vye-pink px-4 text-white shadow-[0_16px_32px_rgba(243,111,152,0.22)] hover:bg-transparent hover:text-vye-pink hover:shadow-none sm:w-auto sm:px-8"
              >
                Discover Vye
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
            <div className="grid max-w-full grid-cols-1 gap-4">
              <Button
                href="/shop"
                className="min-h-[52px] w-full max-w-full rounded-full border border-white/70 bg-vye-pink px-3 text-base text-white shadow-[0_12px_24px_rgba(243,111,152,0.18)] hover:border-vye-pink hover:bg-transparent hover:text-vye-pink hover:shadow-none"
              >
                Discover Vye
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

      <section className="relative overflow-hidden bg-[#f9c8d8] py-12 lg:px-8 lg:py-16">
        <div className="retail-logo-marquee lg:hidden">
          <div className="retail-logo-track">
            {[...retailLogos, ...retailLogos].map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className={`flex shrink-0 items-center justify-center ${logo.marqueeContainerClassName ?? `px-6 ${logo.containerClassName ?? "h-14"}`}`}
                title={logo.name}
              >
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={`max-h-full object-contain opacity-80 mix-blend-multiply grayscale ${logo.marqueeClassName ?? "max-w-[8.5rem]"}`}
                  sizes="140px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto hidden max-w-7xl grid-cols-5 items-center justify-items-center gap-x-14 lg:grid">
          {retailLogos.map((logo) => (
            <div
              key={logo.name}
              className={`flex w-full items-center justify-center ${logo.containerClassName ?? "sm:h-16"}`}
              title={logo.name}
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className={`max-h-full object-contain opacity-80 mix-blend-multiply grayscale ${logo.className ?? "max-w-[11rem]"}`}
                sizes="(min-width: 640px) 20vw, 45vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#f9c8d8_0%,#fbd5e3_58%,#fff7fa_100%)] px-5 pb-18 pt-4 sm:px-8 sm:pb-24 sm:pt-2">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black leading-tight tracking-normal text-palm-green sm:text-5xl">
              Organic refreshment with real coconut character.
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-[34rem] md:hidden">
            <Image
              src="/generated/vye-product-feature-infographic-mobile.png"
              alt="Vye organic coconut water feature infographic"
              width={1200}
              height={1700}
              className="h-auto w-full"
              sizes="100vw"
            />
          </div>

          <div className="mx-auto mt-10 hidden max-w-7xl md:block">
            <Image
              src="/generated/vye-product-feature-infographic.png"
              alt="Vye organic coconut water feature infographic"
              width={2400}
              height={1600}
              className="h-auto w-full"
              sizes="(min-width: 1280px) 1280px, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#fff7fa_0%,#ffffff_48%,#ffffff_100%)] px-5 py-18 sm:px-8 sm:py-24">
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

      <section className="bg-[linear-gradient(180deg,#fff7fa_0%,#fde8ef_100%)] px-5 py-18 sm:px-8 sm:py-24">
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
              href="/our-source"
              variant="secondary"
              className="mt-8 w-full lg:w-auto"
            >
              Our Source
            </Button>
          </article>

          <article className="rounded-[2rem] bg-vye-pink p-8 text-white sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-soft-water">
              find us
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal">
              Find Vye near you.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/74">
              Search our current store list to see where Vye is stocked, then
              grab a bottle from a shelf near you.
            </p>
            <p className="mt-4 text-base font-semibold leading-7 text-white">
              Want to carry Vye?
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="/find-us"
                variant="secondary"
                className="w-full lg:w-auto"
              >
                Find Stores
              </Button>
            </div>
          </article>
        </div>
      </section >
    </div >
  );
}
