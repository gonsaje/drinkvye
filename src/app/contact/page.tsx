import { Button } from "@/components/Button";

export default function ContactPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_46%,rgba(223,245,247,0.38)_100%)]">
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-soft-water/65 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-vye-pink/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-vye-pink">
              contact
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal text-near-black sm:text-6xl">
              Let’s talk coconut water.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-near-black/68">
              For retail, wholesale, press, or launch questions, send a note and
              the Vye team will follow up.
            </p>
            <div className="mt-9">
              <Button href="mailto:info@drinkvye.com">info@drinkvye.com</Button>
            </div>
          </div>

          <form className="rounded-[2rem] border border-palm-green/10 bg-coconut-cream p-6 shadow-[0_18px_55px_rgba(31,41,51,0.08)]">
            <div className="grid gap-5">
              <label className="grid gap-2 text-sm font-bold text-palm-green">
                Name
                <input className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-palm-green">
                Email
                <input
                  type="email"
                  className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-palm-green">
                Message
                <textarea className="min-h-36 resize-y rounded-2xl border border-palm-green/10 bg-white px-4 py-3 font-normal text-near-black outline-none transition focus:border-vye-pink" />
              </label>
              <button
                type="button"
                className="min-h-12 rounded-xl bg-vye-pink px-6 text-sm font-bold text-white transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
