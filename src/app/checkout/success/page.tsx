import { CheckoutSuccess } from "@/components/CheckoutSuccess";

type CheckoutSession = {
  id?: string;
  metadata?: Record<string, string>;
};

function getFallbackOrderReference(sessionId: string) {
  return `VYE-${sessionId.slice(-10).toUpperCase()}`;
}

async function getOrderReference(sessionId: string) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey || !sessionId.startsWith("cs_")) {
    return "";
  }

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(
        sessionId,
      )}`,
      {
        headers: { Authorization: `Bearer ${stripeSecretKey}` },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return getFallbackOrderReference(sessionId);
    }

    const session = (await response.json()) as CheckoutSession;
    const orderReference = session.metadata?.order_reference?.trim();

    return orderReference || getFallbackOrderReference(session.id ?? sessionId);
  } catch {
    return getFallbackOrderReference(sessionId);
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const { session_id: sessionIdParam } = await searchParams;
  const sessionId = Array.isArray(sessionIdParam)
    ? sessionIdParam[0]
    : sessionIdParam;
  const orderReference = sessionId ? await getOrderReference(sessionId) : "";

  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_50%,#fff4f8_78%,#fde8ef_100%)]">
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-soft-water/65 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-vye-pink/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <CheckoutSuccess orderReference={orderReference} />
        </div>
      </section>
    </div>
  );
}
