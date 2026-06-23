"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/lib/useCart";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

function getFormValue(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function formatUsPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  const nationalNumber =
    digits.length > 10 && digits.startsWith("1")
      ? digits.slice(1, 11)
      : digits.slice(0, 10);

  if (nationalNumber.length <= 3) return nationalNumber;
  if (nationalNumber.length <= 6) {
    return `(${nationalNumber.slice(0, 3)}) ${nationalNumber.slice(3)}`;
  }

  return `(${nationalNumber.slice(0, 3)}) ${nationalNumber.slice(
    3,
    6,
  )}-${nationalNumber.slice(6)}`;
}

export function CheckoutForm() {
  const [clientSecret, setClientSecret] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSessionKey, setCheckoutSessionKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { clearCart, items, totalQuantity } = useCart();
  const subtotalCents = items.reduce(
    (total, item) => total + item.product.priceCents * item.quantity,
    0,
  );
  const embeddedCheckoutOptions = useMemo(
    () => ({
      clientSecret,
      onComplete: clearCart,
    }),
    [clearCart, clientSecret],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripePublishableKey) {
      setCheckoutError("Stripe is missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    setCheckoutError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            firstName: getFormValue(formData, "firstName"),
            lastName: getFormValue(formData, "lastName"),
            email: getFormValue(formData, "email"),
            phone: getFormValue(formData, "phone"),
            address: getFormValue(formData, "address"),
            address2: getFormValue(formData, "address2"),
            city: getFormValue(formData, "city"),
            state: getFormValue(formData, "state"),
            zip: getFormValue(formData, "zip"),
          },
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });
      const data = (await response.json()) as {
        clientSecret?: string;
        error?: string;
      };

      if (!response.ok || !data.clientSecret) {
        throw new Error(data.error ?? "Unable to start Stripe Checkout.");
      }

      setClientSecret(data.clientSecret);
      setCheckoutSessionKey((currentKey) => currentKey + 1);
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Unable to start Stripe Checkout.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-palm-green/10 bg-white p-6 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:rounded-[2rem] sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
          checkout
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-normal text-near-black sm:text-4xl">
          Your cart is empty.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-near-black/66">
          Add Vye to your cart before entering checkout details.
        </p>
        <Link
          href="/shop"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-vye-pink px-6 text-sm font-bold text-white shadow-[0_18px_35px_rgba(243,111,152,0.25)] transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink"
        >
          Shop Vye
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_0.42fr] lg:items-start">
      {clientSecret ? (
        <section className="order-2 min-w-0 overflow-hidden rounded-3xl border border-palm-green/10 bg-white p-4 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:rounded-[2rem] sm:p-6 lg:order-1">
          <div className="mb-6 flex flex-col gap-4 border-b border-palm-green/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
                secure payment
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-normal text-near-black sm:text-3xl">
                Complete your order.
              </h1>
            </div>
            <button
              type="button"
              onClick={() => {
                setClientSecret("");
                setCheckoutError("");
              }}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-palm-green/15 bg-white px-4 text-sm font-bold text-palm-green transition hover:border-vye-pink/40 hover:text-vye-pink sm:w-auto"
            >
              Edit Details
            </button>
          </div>

          <EmbeddedCheckoutProvider
            key={checkoutSessionKey}
            stripe={stripePromise}
            options={embeddedCheckoutOptions}
          >
            <EmbeddedCheckout className="min-w-0" />
          </EmbeddedCheckoutProvider>
        </section>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="order-2 min-w-0 rounded-3xl border border-palm-green/10 bg-white p-4 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:rounded-[2rem] sm:p-6 lg:order-1"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
            checkout
          </p>

          <div className="mt-6 grid gap-6 sm:mt-7 sm:gap-7">
            <fieldset className="grid gap-5 rounded-2xl border border-palm-green/10 bg-coconut-cream/45 p-4 sm:rounded-[1.5rem] sm:p-5">
              <legend className="px-2 text-sm font-black uppercase tracking-[0.16em] text-palm-green">
                Contact
              </legend>

              <div className="grid gap-4 sm:grid-cols-2">
                <label
                  className="grid gap-2 text-sm font-bold text-palm-green"
                  htmlFor="checkout-first-name"
                >
                  <span>
                    First name <span className="text-vye-pink">*</span>
                  </span>
                  <input
                    id="checkout-first-name"
                    name="firstName"
                    required
                    autoComplete="given-name"
                    className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
                  />
                </label>
                <label
                  className="grid gap-2 text-sm font-bold text-palm-green"
                  htmlFor="checkout-last-name"
                >
                  <span>
                    Last name <span className="text-vye-pink">*</span>
                  </span>
                  <input
                    id="checkout-last-name"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label
                  className="grid gap-2 text-sm font-bold text-palm-green"
                  htmlFor="checkout-email"
                >
                  <span>
                    Email <span className="text-vye-pink">*</span>
                  </span>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
                  />
                </label>
                <label
                  className="grid gap-2 text-sm font-bold text-palm-green"
                  htmlFor="checkout-phone"
                >
                  <span>
                    Phone <span className="text-vye-pink">*</span>
                  </span>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    required
                    autoComplete="tel-national"
                    placeholder="(555) 123-4567"
                    pattern="\(\d{3}\) \d{3}-\d{4}"
                    maxLength={14}
                    title="Enter a 10-digit U.S. phone number."
                    onInput={(event) => {
                      event.currentTarget.value = formatUsPhoneNumber(
                        event.currentTarget.value,
                      );
                    }}
                    className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
                  />
                </label>
              </div>
            </fieldset>

            <fieldset className="grid gap-5 rounded-2xl border border-palm-green/10 bg-coconut-cream/45 p-4 sm:rounded-[1.5rem] sm:p-5">
              <legend className="px-2 text-sm font-black uppercase tracking-[0.16em] text-palm-green">
                Shipping Details
              </legend>

              <label
                className="grid gap-2 text-sm font-bold text-palm-green"
                htmlFor="checkout-address"
              >
                <span>
                  Street address <span className="text-vye-pink">*</span>
                </span>
                <input
                  id="checkout-address"
                  name="address"
                  required
                  autoComplete="shipping street-address"
                  className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
                />
              </label>

              <label
                className="grid gap-2 text-sm font-bold text-palm-green"
                htmlFor="checkout-address-2"
              >
                Apartment, suite, etc.
                <input
                  id="checkout-address-2"
                  name="address2"
                  autoComplete="shipping address-line2"
                  className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-[1fr_0.48fr_0.48fr]">
                <label
                  className="grid gap-2 text-sm font-bold text-palm-green"
                  htmlFor="checkout-city"
                >
                  <span>
                    City <span className="text-vye-pink">*</span>
                  </span>
                  <input
                    id="checkout-city"
                    name="city"
                    required
                    autoComplete="shipping address-level2"
                    className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
                  />
                </label>
                <label
                  className="grid gap-2 text-sm font-bold text-palm-green"
                  htmlFor="checkout-state"
                >
                  <span>
                    State <span className="text-vye-pink">*</span>
                  </span>
                  <input
                    id="checkout-state"
                    name="state"
                    required
                    autoComplete="shipping address-level1"
                    maxLength={2}
                    className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal uppercase text-near-black outline-none transition focus:border-vye-pink"
                  />
                </label>
                <label
                  className="grid gap-2 text-sm font-bold text-palm-green"
                  htmlFor="checkout-zip"
                >
                  <span>
                    ZIP <span className="text-vye-pink">*</span>
                  </span>
                  <input
                    id="checkout-zip"
                    name="zip"
                    required
                    autoComplete="shipping postal-code"
                    className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
                  />
                </label>
              </div>
            </fieldset>
          </div>

          {checkoutError ? (
            <p className="mt-5 rounded-xl bg-vye-pink/10 px-4 py-3 text-sm font-bold text-vye-pink">
              {checkoutError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-vye-pink px-6 text-sm font-bold text-white shadow-[0_18px_35px_rgba(243,111,152,0.25)] transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink disabled:cursor-not-allowed disabled:bg-vye-pink/55 disabled:shadow-none"
          >
            {isSubmitting ? "Preparing Payment..." : "Continue To Payment"}
          </button>
        </form>
      )}

      <aside className="order-1 min-w-0 rounded-3xl border border-palm-green/10 bg-coconut-cream p-5 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:rounded-[2rem] sm:p-6 lg:order-2">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
          order summary
        </p>
        <div className="mt-5 space-y-4 border-b border-palm-green/10 pb-5 text-sm text-near-black/68">
          <div className="flex items-center justify-between gap-4">
            <span>Items</span>
            <span className="font-black text-near-black">{totalQuantity}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Subtotal</span>
            <span className="font-black text-near-black">
              {formatPrice(subtotalCents)}
            </span>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-near-black/64">
          Standard shipping is added in the Stripe payment step.
        </p>
        <Link
          href="/cart"
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-palm-green/15 bg-white px-6 text-sm font-bold text-palm-green transition hover:border-vye-pink/40 hover:text-vye-pink"
        >
          Back To Cart
        </Link>
      </aside>
    </div>
  );
}
