"use client";

import { FormEvent, useState } from "react";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const inputClassName =
  "min-h-12 rounded-2xl border border-palm-green/12 bg-white px-4 font-normal text-near-black outline-none transition placeholder:text-near-black/35 focus:border-vye-pink";

export function WholesaleForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to submit your application.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your application.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-palm-green/10 bg-coconut-cream p-5 shadow-[0_20px_60px_rgba(31,41,51,0.09)] sm:p-8"
    >
      <label className="hidden" aria-hidden="true" htmlFor="wholesale-company">
        Company
        <input
          id="wholesale-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <fieldset>
        <legend className="text-sm font-black uppercase tracking-[0.18em] text-vye-pink">
          Contact information
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            First name
            <input
              name="firstName"
              required
              autoComplete="given-name"
              className={inputClassName}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Last name
            <input
              name="lastName"
              required
              autoComplete="family-name"
              className={inputClassName}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Business email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClassName}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Phone
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={inputClassName}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-9 border-t border-palm-green/10 pt-8">
        <legend className="text-sm font-black uppercase tracking-[0.18em] text-vye-pink">
          Business details
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Business name
            <input
              name="businessName"
              required
              autoComplete="organization"
              className={inputClassName}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Business type
            <select name="businessType" required className={inputClassName}>
              <option value="">Select one</option>
              <option>Grocery or market</option>
              <option>Café or restaurant</option>
              <option>Gym or wellness studio</option>
              <option>Distributor</option>
              <option>Online retailer</option>
              <option>Hotel or hospitality</option>
              <option>Other</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Website
            <input
              name="website"
              type="url"
              inputMode="url"
              placeholder="https://"
              className={inputClassName}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            Number of locations
            <input
              name="locations"
              type="number"
              min="1"
              required
              className={inputClassName}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green sm:col-span-2">
            Estimated opening order or monthly volume
            <input
              name="estimatedVolume"
              placeholder="For example: 20 cases per month"
              className={inputClassName}
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-9 border-t border-palm-green/10 pt-8">
        <legend className="text-sm font-black uppercase tracking-[0.18em] text-vye-pink">
          Business address
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold text-palm-green sm:col-span-2">
            Street address
            <input
              name="address"
              required
              autoComplete="street-address"
              className={inputClassName}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-palm-green">
            City
            <input
              name="city"
              required
              autoComplete="address-level2"
              className={inputClassName}
            />
          </label>
          <div className="grid grid-cols-2 gap-5">
            <label className="grid gap-2 text-sm font-bold text-palm-green">
              State
              <input
                name="state"
                required
                maxLength={2}
                autoComplete="address-level1"
                className={inputClassName}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-palm-green">
              ZIP
              <input
                name="zip"
                required
                autoComplete="postal-code"
                className={inputClassName}
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-bold text-palm-green sm:col-span-2">
            Do you have a current resale certificate?
            <select name="resaleStatus" required className={inputClassName}>
              <option value="">Select one</option>
              <option>Yes</option>
              <option>Not yet</option>
              <option>Not sure</option>
            </select>
          </label>
        </div>
      </fieldset>

      <label className="mt-9 grid gap-2 border-t border-palm-green/10 pt-8 text-sm font-bold text-palm-green">
        Tell us about your business
        <textarea
          name="message"
          required
          placeholder="Where would you like to carry Vye, and what makes it a fit for your customers?"
          className="min-h-36 resize-y rounded-2xl border border-palm-green/12 bg-white px-4 py-3 font-normal text-near-black outline-none transition placeholder:text-near-black/35 focus:border-vye-pink"
        />
      </label>

      {status === "success" ? (
        <p className="mt-6 rounded-2xl bg-palm-green/10 px-4 py-4 text-sm font-bold text-palm-green">
          Thanks for your interest in Vye. Your wholesale application has been
          sent, and our team will follow up by email.
        </p>
      ) : null}

      {status === "error" ? (
        <p className="mt-6 rounded-2xl bg-vye-pink/10 px-4 py-4 text-sm font-bold text-vye-pink">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-vye-pink px-7 text-sm font-black text-white shadow-[0_16px_34px_rgba(243,111,152,0.2)] transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink disabled:cursor-not-allowed disabled:opacity-55"
      >
        {status === "submitting"
          ? "Submitting Application..."
          : "Apply For Wholesale"}
      </button>
    </form>
  );
}
