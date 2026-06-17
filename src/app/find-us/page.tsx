import { Button } from "@/components/Button";
import { FindUsMap } from "@/components/FindUsMap";
import { storeLocations } from "./locations";

export default function FindUsPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_48%,rgba(223,245,247,0.45)_72%,var(--color-coconut-green)_100%)]">
      <section className="relative bg-gradient-to-b from-coconut-cream via-coconut-cream px-5 pt-20 sm:px-8  sm:pt-28">
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-palm-green">
            find us
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal text-near-black sm:text-6xl">
            Vye is heading for chilled shelves near you.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-near-black/68">
            Store locator data will live here as retail partners come online.
            For now, this page is ready for zip search, market filters, and
            partner listings.
          </p>
        </div>
      </section>

      <section className="relative px-5 py-18 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <FindUsMap locations={storeLocations} />
        </div>
      </section>

      <section className="relative bg-gradient-to-b via-coconut-green/10 to-coconut-green/20 px-5 py-18 text-near-black sm:px-8 sm:py-24">
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-normal">
              Want to carry Vye?
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-white/74">
              Reach out for wholesale, sampling, and launch market details.
            </p>
          </div>
          <Button href="/contact" variant="secondary" className="bg-white text-palm-green hover:bg-coconut-cream">
            Contact
          </Button>
        </div>
      </section>
    </div>
  );
}
