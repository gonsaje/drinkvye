import Image from "next/image";
import { Button } from "@/components/Button";

const simpleStandards = [
  "USDA Organic",
  "Never From Concentrate",
  "No Added Sugar",
  "Non-GMO",
  "Vegan",
];

export default function OurStoryPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_36%,#ffffff_68%,#fff4f8_84%,#fde8ef_100%)]">
      <section className="relative overflow-hidden bg-gradient-to-b from-vye-pink/24 via-coconut-cream to-white px-5 pb-16 pt-18 sm:px-8 sm:pb-28 sm:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-black leading-tight tracking-normal text-palm-green sm:text-7xl">
            Our Source
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-near-black/68 sm:mt-6 sm:text-xl sm:leading-9">
            Every Sip Begins with Better Coconuts.
          </p>
        </div>
      </section>

      <section className="relative bg-white px-5 py-14 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-normal text-near-black sm:mt-4 sm:text-5xl">
              From the Mekong Delta
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-near-black/68 sm:mt-6 sm:text-lg sm:leading-8">
              Organically grown young coconuts from Southern Vietnam, where
              tropical rain and fertile soil create naturally refreshing
              coconut water.
            </p>
          </div>

          <div className="grid gap-4 ">
            <div className="relative min-h-[320px] overflow-hidden rounded-[1.5rem] bg-coconut-cream shadow-[0_24px_70px_rgba(36,90,53,0.12)] sm:min-h-[520px] sm:rounded-[2rem]">
              <Image
                src="/coconut_boat.png"
                alt="Coconuts gathered along a waterway in Southern Vietnam"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#ffffff_0%,#fffdf8_42%,#ffffff_100%)] px-5 py-14 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-center">
          <div className="order-2 flex justify-center lg:order-1">
            <div className="relative flex aspect-square w-56 items-center justify-center rounded-full bg-white p-7 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:w-80 sm:p-8">
              <div className="absolute inset-5 rounded-full bg-vye-pink/12 blur-2xl" />
              <Image
                src="/electrolytes.png"
                alt="Electrolytes icon"
                width={449}
                height={463}
                className="relative h-[78%] w-[78%] object-contain"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-black leading-tight tracking-normal text-near-black sm:mt-4 sm:text-5xl">
              Naturally Rich in Electrolytes
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-near-black/68 sm:mt-6 sm:text-lg sm:leading-8">
              Packed with naturally occurring potassium and essential minerals
              to help keep you refreshed.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[linear-gradient(180deg,#ffffff_0%,#fff8fb_100%)] px-5 py-14 sm:px-8 sm:py-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="pointer-events-none absolute -left-10 top-10 h-56 w-56 rounded-full bg-vye-pink/14 blur-3xl" />
          <div className="pointer-events-none absolute -right-8 bottom-10 h-64 w-64 rounded-full bg-palm-green/10 blur-3xl" />

          <div className="relative ml-auto max-w-4xl rotate-[0.8deg] overflow-hidden rounded-[1.5rem] bg-coconut-cream shadow-[0_28px_80px_rgba(36,90,53,0.14)] ring-1 ring-white/75 sm:rounded-[2.25rem] lg:rotate-[1.4deg]">
            <div className="relative min-h-[330px] sm:min-h-[560px] lg:min-h-[640px]">
              <Image
                src="/coconut_machete.png"
                alt="Young coconuts being prepared in Southern Vietnam"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 70vw, 100vw"
              />
            </div>
          </div>

          <div className="relative z-10 mx-auto -mt-12 max-w-[92%] rotate-[-0.8deg] rounded-[1.5rem] bg-white/94 p-5 shadow-[0_22px_55px_rgba(146,45,83,0.14)] ring-1 ring-vye-pink/12 backdrop-blur sm:max-w-2xl sm:rotate-[-1.4deg] sm:rounded-[2rem] sm:p-8 lg:absolute lg:left-0 lg:top-1/2 lg:mx-0 lg:mt-0 lg:-translate-y-1/2 lg:rotate-[-2deg]">
            <h2 className="text-3xl font-black leading-tight tracking-normal text-near-black sm:text-5xl">
              Clean standards, simple ingredients
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-near-black/68 sm:mt-5 sm:text-lg sm:leading-8">
              Everything Vye leaves out is as intentional as what goes in:
              organic coconut water, made clean and easy to love.
            </p>
            <div className="mt-5 grid gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3">
              {simpleStandards.map((standard) => (
                <div
                  key={standard}
                  className="flex items-center gap-3 rounded-2xl bg-coconut-cream/85 px-4 py-3.5 text-sm font-black text-palm-green shadow-[0_10px_26px_rgba(31,41,51,0.04)] sm:py-4 sm:text-base"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-vye-pink text-sm text-white">
                    ✓
                  </span>
                  {standard}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff8fb_0%,#fff1f6_42%,#fde8ef_100%)] px-5 py-14 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black leading-tight tracking-normal text-near-black sm:text-5xl">
              Light. Crisp. Refreshing.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-near-black/68 sm:mt-6 sm:text-lg sm:leading-8">
              Made with one simple ingredient: organic coconut water.
            </p>
            <Button href="/shop" className="mt-8">
              Discover Vye
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-xl px-1 py-5 sm:px-6 sm:py-6">
            <div className="absolute -left-2 top-14 h-40 w-40 rounded-full bg-vye-pink/20 blur-3xl" />
            <div className="absolute -right-2 bottom-10 h-44 w-44 rounded-full bg-palm-green/12 blur-3xl" />
            <div className="relative rotate-[1.2deg] bg-white p-3 pb-16 shadow-[0_24px_62px_rgba(146,45,83,0.16)] ring-1 ring-vye-pink/10 sm:rotate-[2deg] sm:p-5 sm:pb-24">
              <div className="relative h-[320px] overflow-hidden bg-[#fff6fa] min-[430px]:h-[370px] sm:h-[470px]">
                <Image
                  src="/refreshing_vye.png"
                  alt="Refreshing Vye organic coconut water served chilled"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 36vw, 100vw"
                />
              </div>
              <p className="absolute inset-x-4 bottom-5 text-center font-vye-display text-[1.65rem] leading-none text-palm-green sm:inset-x-6 sm:bottom-8 sm:text-4xl">
                Hydrate Better, Live Better
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
