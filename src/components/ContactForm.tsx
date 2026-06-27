"use client";

import { FormEvent } from "react";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const honeypot = String(formData.get("company") ?? "").trim();

    if (honeypot) {
      form.reset();
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to send your message.");
      }

      form.reset();
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message.",
      );
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
          <span>
            Name <span className="text-vye-pink">*</span>
          </span>
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
          <span>
            Email <span className="text-vye-pink">*</span>
          </span>
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
          <span>
            Message <span className="text-vye-pink">*</span>
          </span>
          <textarea
            id="contact-message"
            name="message"
            required
            className="min-h-36 resize-y rounded-2xl border border-palm-green/10 bg-white px-4 py-3 font-normal text-near-black outline-none transition focus:border-vye-pink"
          />
        </label>

        {status === "sent" ? (
          <p className="rounded-xl bg-palm-green/10 px-4 py-3 text-sm font-bold text-palm-green">
            Thanks. Your message has been sent to the Vye team.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="rounded-xl bg-vye-pink/10 px-4 py-3 text-sm font-bold text-vye-pink">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "sending"}
          className="min-h-12 rounded-xl bg-vye-pink px-6 text-sm font-bold text-white transition hover:bg-[#e85f89] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vye-pink"
        >
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
