import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_50%,#fff4f8_78%,#fde8ef_100%)]">
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
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
