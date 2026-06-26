"use client";

import { FormEvent } from "react";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const honeypot = String(formData.get("company") ?? "").trim();

    if (honeypot) {
      event.currentTarget.reset();
      return;
    }
  }

  return (
    <form
      className="rounded-[2rem] border border-palm-green/10 bg-coconut-cream p-6 shadow-[0_18px_55px_rgba(31,41,51,0.08)]"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5">
        <label
          className="hidden"
          aria-hidden="true"
          htmlFor="contact-company"
        >
          Company
          <input
            id="contact-company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>

        <label
          className="grid gap-2 text-sm font-bold text-palm-green"
          htmlFor="contact-name"
        >
          Name
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
          />
        </label>

        <label
          className="grid gap-2 text-sm font-bold text-palm-green"
          htmlFor="contact-email"
        >
          Email
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="min-h-12 rounded-2xl border border-palm-green/10 bg-white px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
          />
        </label>

        <label
          className="grid gap-2 text-sm font-bold text-palm-green"
          htmlFor="contact-message"
        >
          Message
          <textarea
            id="contact-message"
            name="message"
            className="min-h-36 resize-y rounded-2xl border border-palm-green/10 bg-white px-4 py-3 font-normal text-near-black outline-none transition focus:border-vye-pink"
          />
        </label>

        <button
          type="submit"
          className="min-h-12 rounded-xl bg-vye-pink px-6 text-sm font-bold text-white transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
