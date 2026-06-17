"use client";

import { FormEvent, useState } from "react";

type CaptchaChallenge = {
  left: number;
  right: number;
};

const captchaChallenges: CaptchaChallenge[] = [
  { left: 7, right: 5 },
  { left: 4, right: 9 },
  { left: 8, right: 6 },
  { left: 3, right: 11 },
];

export function ContactForm() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "passed">("idle");
  const challenge = captchaChallenges[challengeIndex];
  const expectedAnswer = challenge.left + challenge.right;

  function refreshCaptcha() {
    setChallengeIndex((currentIndex) =>
      currentIndex + 1 >= captchaChallenges.length ? 0 : currentIndex + 1,
    );
    setCaptchaAnswer("");
    setStatus("idle");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const honeypot = String(formData.get("company") ?? "").trim();

    if (honeypot) {
      setStatus("passed");
      event.currentTarget.reset();
      setCaptchaAnswer("");
      return;
    }

    if (Number(captchaAnswer.trim()) !== expectedAnswer) {
      setStatus("error");
      return;
    }

    setStatus("passed");
    event.currentTarget.reset();
    setCaptchaAnswer("");
    setChallengeIndex((currentIndex) =>
      currentIndex + 1 >= captchaChallenges.length ? 0 : currentIndex + 1,
    );
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

        <div className="rounded-2xl border border-palm-green/10 bg-white px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label
              className="grid flex-1 gap-2 text-sm font-bold text-palm-green"
              htmlFor="contact-captcha"
            >
              CAPTCHA: what is {challenge.left} + {challenge.right}?
              <input
                id="contact-captcha"
                name="captcha"
                type="number"
                inputMode="numeric"
                required
                value={captchaAnswer}
                onChange={(event) => {
                  setCaptchaAnswer(event.target.value);
                  setStatus("idle");
                }}
                className="min-h-12 rounded-xl border border-palm-green/10 bg-coconut-cream px-4 font-normal text-near-black outline-none transition focus:border-vye-pink"
              />
            </label>
            <button
              type="button"
              onClick={refreshCaptcha}
              className="min-h-12 rounded-xl border border-palm-green/15 px-4 text-sm font-bold text-palm-green transition hover:border-vye-pink hover:text-vye-pink"
            >
              Refresh
            </button>
          </div>
          <p className="mt-3 text-sm leading-6 text-near-black/62">
            This quick check helps keep automated spam out of the contact form.
          </p>
        </div>

        {status === "error" ? (
          <p className="rounded-xl bg-vye-pink/10 px-4 py-3 text-sm font-bold text-vye-pink">
            Please answer the CAPTCHA correctly before sending.
          </p>
        ) : null}

        {status === "passed" ? (
          <p className="rounded-xl bg-palm-green/10 px-4 py-3 text-sm font-bold text-palm-green">
            Human check passed. Form delivery can now be connected to your email
            provider.
          </p>
        ) : null}

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
