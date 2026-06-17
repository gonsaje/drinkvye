"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import { useCart } from "@/lib/useCart";

export function CartView() {
  const { clearCart, items, removeItem, totalQuantity, updateItemQuantity } =
    useCart();
  const subtotalCents = items.reduce(
    (total, item) => total + item.product.priceCents * item.quantity,
    0,
  );

  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-palm-green/10 bg-white p-8 shadow-[0_18px_55px_rgba(31,41,51,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
          empty cart
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-normal text-near-black">
          Your cart is waiting for Vye.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-near-black/66">
          Add organic coconut water to your cart, then come back here to review
          your order.
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
    <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-start">
      <section className="rounded-[2rem] border border-palm-green/10 bg-white p-5 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-palm-green/10 pb-5">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
              cart
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-normal text-near-black">
              Review your cart.
            </h1>
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="rounded-xl border border-palm-green/15 px-4 py-3 text-sm font-bold text-palm-green transition hover:border-vye-pink hover:text-vye-pink"
          >
            Clear
          </button>
        </div>

        <div className="divide-y divide-palm-green/10">
          {items.map((item) => (
            <div
              key={item.productId}
              className="grid gap-5 py-6 sm:grid-cols-[104px_1fr] sm:items-center"
            >
              <div className="flex h-28 items-center justify-center rounded-2xl bg-coconut-cream">
                <div className="relative h-24 w-20">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="scale-125 object-contain"
                    sizes="80px"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h2 className="text-xl font-black tracking-normal text-near-black">
                    {item.product.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-near-black/62">
                    {item.product.pack} · {item.product.size}
                  </p>
                  <p className="mt-2 text-sm font-bold text-palm-green">
                    {item.product.priceLabel}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <label
                    htmlFor={`quantity-${item.productId}`}
                    className="sr-only"
                  >
                    Quantity for {item.product.name}
                  </label>
                  <div className="inline-flex min-h-11 overflow-hidden rounded-xl border border-palm-green/15 bg-coconut-cream">
                    <button
                      type="button"
                      onClick={() =>
                        updateItemQuantity(item.productId, item.quantity - 1)
                      }
                      className="w-11 text-lg font-black text-palm-green transition hover:bg-soft-water"
                      aria-label={`Decrease quantity for ${item.product.name}`}
                    >
                      -
                    </button>
                    <input
                      id={`quantity-${item.productId}`}
                      min={1}
                      max={99}
                      type="number"
                      inputMode="numeric"
                      value={item.quantity}
                      onChange={(event) =>
                        updateItemQuantity(
                          item.productId,
                          Number(event.target.value),
                        )
                      }
                      className="quantity-input w-16 border-x border-palm-green/10 bg-white text-center text-base font-black text-near-black outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateItemQuantity(item.productId, item.quantity + 1)
                      }
                      className="w-11 text-lg font-black text-palm-green transition hover:bg-soft-water"
                      aria-label={`Increase quantity for ${item.product.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="rounded-xl px-3 py-2 text-sm font-bold text-near-black/52 transition hover:bg-coconut-cream hover:text-vye-pink"
                  >
                    Remove
                  </button>
                  <p className="w-full text-right text-sm font-black text-near-black md:w-auto">
                    {formatPrice(item.product.priceCents * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="rounded-[2rem] border border-palm-green/10 bg-coconut-cream p-6 shadow-[0_18px_55px_rgba(31,41,51,0.08)]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
          summary
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
        <Link
          href="/checkout"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-vye-pink px-6 text-sm font-bold text-white shadow-[0_18px_35px_rgba(243,111,152,0.25)] transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink"
        >
          Checkout
        </Link>
        <Link
          href="/shop"
          className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-palm-green/15 bg-white px-6 text-sm font-bold text-palm-green transition hover:border-vye-pink/40 hover:text-vye-pink"
        >
          Continue Shopping
        </Link>
      </aside>
    </div>
  );
}
