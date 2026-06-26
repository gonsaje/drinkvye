import { CheckoutForm } from "@/components/CheckoutForm";

function getShippingCents() {
  const configuredShipping = process.env.VYE_STANDARD_SHIPPING_CENTS;

  if (!configuredShipping) return 0;

  const parsedShipping = Number(configuredShipping);

  if (!Number.isFinite(parsedShipping)) return 0;

  return Math.max(0, Math.round(parsedShipping));
}

export default function CheckoutPage() {
  const shippingCents = getShippingCents();

  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_50%,#fff4f8_78%,#fde8ef_100%)]">
      <section className="relative overflow-hidden px-4 py-12 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-soft-water/65 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-vye-pink/10 blur-3xl" />
        <div className="relative mx-auto max-w-[92rem]">
          <CheckoutForm shippingCents={shippingCents} />
        </div>
      </section>
    </div>
  );
}
