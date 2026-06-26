import { CartView } from "@/components/CartView";

export default function CartPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_50%,#fff4f8_78%,#fde8ef_100%)]">
      <section className="relative overflow-hidden px-4 py-12 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-soft-water/65 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-vye-pink/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <CartView />
        </div>
      </section>
    </div>
  );
}
