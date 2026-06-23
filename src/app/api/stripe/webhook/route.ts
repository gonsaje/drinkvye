import { createHmac, timingSafeEqual } from "node:crypto";
import {
  sendOrderConfirmation,
  type OrderConfirmation,
} from "@/lib/orderConfirmationEmail";

export const runtime = "nodejs";

type StripeAddress = OrderConfirmation["shippingAddress"];

type StripeCheckoutSession = {
  amount_total?: number | null;
  currency?: string | null;
  customer?: string | { id?: string } | null;
  customer_details?: {
    email?: string | null;
    name?: string | null;
  } | null;
  id: string;
  metadata?: Record<string, string>;
  payment_status?: string;
  shipping_cost?: { amount_total?: number | null } | null;
};

type StripeEvent = {
  data?: { object?: StripeCheckoutSession };
  type?: string;
};

type StripeCustomer = {
  email?: string | null;
  name?: string | null;
  shipping?: {
    address?: StripeAddress;
    name?: string | null;
  } | null;
};

type StripeLineItems = {
  data?: Array<{
    amount_total?: number | null;
    description?: string | null;
    quantity?: number | null;
  }>;
};

function verifyStripeSignature(
  payload: string,
  signatureHeader: string,
  secret: string,
) {
  const values = signatureHeader.split(",").reduce<Record<string, string[]>>(
    (result, entry) => {
      const [key, value] = entry.split("=", 2);

      if (key && value) {
        result[key] = [...(result[key] ?? []), value];
      }

      return result;
    },
    {},
  );
  const timestamp = values.t?.[0];
  const signatures = values.v1 ?? [];

  if (!timestamp || !signatures.length) return false;

  const timestampSeconds = Number(timestamp);

  if (
    !Number.isFinite(timestampSeconds) ||
    Math.abs(Date.now() / 1000 - timestampSeconds) > 300
  ) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`, "utf8")
    .digest();

  return signatures.some((signature) => {
    if (!/^[a-f0-9]{64}$/i.test(signature)) return false;

    const received = Buffer.from(signature, "hex");

    return received.length === expected.length && timingSafeEqual(received, expected);
  });
}

async function getStripeObject<T>(path: string, secretKey: string) {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  const body = (await response.json()) as T & {
    error?: { message?: string };
  };

  if (!response.ok) {
    throw new Error(body.error?.message ?? `Stripe request failed: ${path}`);
  }

  return body;
}

function getOrderReference(session: StripeCheckoutSession) {
  const configuredReference = session.metadata?.order_reference?.trim();

  if (configuredReference) return configuredReference;

  return `VYE-${session.id.slice(-10).toUpperCase()}`;
}

function getCustomerId(customer: StripeCheckoutSession["customer"]) {
  if (typeof customer === "string") return customer;
  return customer?.id ?? "";
}

async function sendConfirmationForSession(
  session: StripeCheckoutSession,
  secretKey: string,
) {
  const customerId = getCustomerId(session.customer);
  const [customer, lineItems] = await Promise.all([
    customerId
      ? getStripeObject<StripeCustomer>(`customers/${customerId}`, secretKey)
      : Promise.resolve<StripeCustomer>({}),
    getStripeObject<StripeLineItems>(
      `checkout/sessions/${session.id}/line_items?limit=100`,
      secretKey,
    ),
  ]);
  const customerEmail = customer.email ?? session.customer_details?.email ?? "";

  if (!customerEmail) {
    throw new Error(`Stripe session ${session.id} has no customer email.`);
  }

  await sendOrderConfirmation({
    orderId: getOrderReference(session),
    stripeSessionId: session.id,
    customerEmail,
    customerName:
      customer.name ??
      customer.shipping?.name ??
      session.customer_details?.name ??
      session.metadata?.customer_name ??
      "",
    shippingAddress: customer.shipping?.address,
    currency: session.currency ?? "usd",
    amountTotal: session.amount_total ?? 0,
    amountShipping: session.shipping_cost?.amount_total ?? 0,
    lineItems:
      lineItems.data?.map((item) => ({
        description: item.description ?? "Vye order",
        quantity: item.quantity ?? 1,
        amountTotal: item.amount_total ?? 0,
      })) ?? [],
  });
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  if (!webhookSecret || !stripeSecretKey) {
    return Response.json(
      { error: "Stripe webhook environment variables are missing." },
      { status: 500 },
    );
  }

  if (
    !signature ||
    !verifyStripeSignature(payload, signature, webhookSecret)
  ) {
    return Response.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }

  let event: StripeEvent;

  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return Response.json({ error: "Invalid Stripe payload." }, { status: 400 });
  }

  const session = event.data?.object;
  const isCompletedEvent =
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded";

  if (isCompletedEvent && session?.id && session.payment_status === "paid") {
    await sendConfirmationForSession(session, stripeSecretKey);
  }

  return Response.json({ received: true });
}
