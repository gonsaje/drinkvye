"use client";

import Link from "next/link";
import { useState } from "react";
import { vyeProduct } from "@/lib/products";
import { useCart } from "@/lib/useCart";

export function AddToCart() {
  const [quantity, setQuantity] = useState(1);
  const { addItem, getItemQuantity } = useCart();
  const cartQuantity = getItemQuantity(vyeProduct.id);

  function updateQuantity(nextQuantity: number) {
    setQuantity(Math.max(1, Math.min(24, nextQuantity)));
  }

  function handleAddToCart() {
    addItem(vyeProduct.id, quantity);
  }

  return (
    <div className="mt-7 rounded-2xl border border-palm-green/10 bg-white p-4 shadow-[0_18px_45px_rgba(31,41,51,0.06)] sm:mt-9 sm:rounded-[1.5rem] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label
          className="grid w-full gap-2 text-sm font-bold text-palm-green sm:w-auto"
          htmlFor="vye-product-quantity"
        >
          Quantity
          <div className="flex min-h-12 w-full overflow-hidden rounded-xl border border-palm-green/15 bg-coconut-cream sm:w-auto">
            <button
              type="button"
              onClick={() => updateQuantity(quantity - 1)}
              className="w-12 shrink-0 text-lg font-black text-palm-green transition hover:bg-soft-water"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              id="vye-product-quantity"
              min={1}
              max={24}
              type="number"
              inputMode="numeric"
              value={quantity}
              onChange={(event) => updateQuantity(Number(event.target.value))}
              className="quantity-input min-w-0 flex-1 border-x border-palm-green/10 bg-white text-center text-base font-black text-near-black outline-none sm:w-16 sm:flex-none"
            />
            <button
              type="button"
              onClick={() => updateQuantity(quantity + 1)}
              className="w-12 shrink-0 text-lg font-black text-palm-green transition hover:bg-soft-water"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </label>

        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-vye-pink px-6 text-sm font-bold text-white shadow-[0_18px_35px_rgba(243,111,152,0.25)] transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink"
        >
          Add To Cart
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 text-sm text-near-black/64 sm:flex-row sm:items-center sm:justify-between">
        <span className="leading-6">
          {cartQuantity > 0
            ? `${cartQuantity} in your cart`
            : "Choose a quantity and add it to your cart."}
        </span>
        {cartQuantity > 0 ? (
          <Link
            href="/cart"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-vye-pink/20 bg-vye-pink/8 px-4 font-bold text-vye-pink transition hover:border-palm-green/20 hover:text-palm-green sm:min-h-0 sm:w-auto sm:border-0 sm:bg-transparent sm:p-0"
          >
            View cart
          </Link>
        ) : null}
      </div>
    </div>
  );
}
