"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/useCart";

type CheckoutSuccessProps = {
  orderReference?: string;
};

export function CheckoutSuccess({ orderReference }: CheckoutSuccessProps) {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="rounded-[2rem] border border-palm-green/10 bg-white p-8 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:p-10">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-palm-green">
        order placed
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-normal text-near-black">
        Thanks for ordering Vye.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-near-black/66">
        We have received your payment. Your payment receipt and Vye order
        confirmation will be sent to the email used at checkout.
      </p>
      {orderReference ? (
        <div className="mt-6 rounded-2xl border border-palm-green/10 bg-coconut-cream px-5 py-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-palm-green/65">
            Order number
          </p>
          <p className="mt-1 text-xl font-black tracking-normal text-near-black">
            {orderReference}
          </p>
        </div>
      ) : null}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-vye-pink px-6 text-sm font-bold text-white shadow-[0_18px_35px_rgba(243,111,152,0.25)] transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink"
        >
          Shop Again
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-palm-green/15 bg-white px-6 text-sm font-bold text-palm-green transition hover:border-vye-pink/40 hover:text-vye-pink"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}
