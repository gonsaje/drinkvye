import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vye",
  description: "How Vye collects, uses, and protects personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    copy: "When you visit our website, place an order, submit a wholesale application, or contact us, we may collect:",
    items: [
      "Name",
      "Email address",
      "Phone number",
      "Billing and shipping address",
      "Payment information, processed securely through our payment providers",
      "Order history",
      "Business information submitted through wholesale applications",
      "Device information, IP address, browser type, and cookies",
    ],
  },
  {
    title: "How We Use Your Information",
    copy: "We may use your information to:",
    items: [
      "Process and fulfill orders",
      "Provide customer support",
      "Communicate about your purchases",
      "Evaluate wholesale applications",
      "Prevent fraud and protect the Website",
      "Improve our website and services",
      "Send promotional emails if you have opted in",
    ],
    note: "You may unsubscribe from marketing emails at any time.",
  },
  {
    title: "Sharing Your Information",
    copy: "We do not sell your personal information. We may share information only with trusted service providers when necessary to operate our business, including Stripe for payment processing, Resend for transactional email delivery, Vercel for website hosting, shipping carriers for order delivery, and OpenStreetMap services used by our store locator.",
  },
  {
    title: "Cookies and Browser Storage",
    copy: "Our Website may use cookies and similar technologies to improve your browsing experience, remember preferences, and analyze website traffic. The shopping cart is stored in your browser’s local storage. You may remove this information by clearing your cart or browser data and may disable cookies through your browser settings.",
  },
  {
    title: "Data Security",
    copy: "We use reasonable administrative, technical, and physical safeguards to protect your personal information. However, no method of online transmission or storage is completely secure.",
  },
  {
    title: "Your Rights",
    copy: "You may request access to, correction of, or deletion of your personal information by contacting us. Some information may need to be retained to comply with legal, accounting, fraud-prevention, or recordkeeping obligations.",
  },
  {
    title: "Third-Party Links",
    copy: "Our Website may contain links to third-party websites. We are not responsible for their privacy practices or content.",
  },
  {
    title: "Changes to This Policy",
    copy: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.",
  },
  {
    title: "Contact Us",
    copy: "If you have any questions regarding this Privacy Policy, please contact VYE Organic Coconut Water at info@drinkvye.com.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[linear-gradient(180deg,var(--color-coconut-cream)_0%,#ffffff_55%,rgba(251,215,227,0.45)_100%)] px-5 py-20 sm:px-8 sm:py-28">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-vye-pink">
          legal
        </p>
        <h1 className="mt-5 text-5xl font-black tracking-normal text-near-black sm:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-sm font-semibold text-near-black/52">
          Effective June 22, 2026
        </p>
        <p className="mt-8 max-w-3xl text-base leading-8 text-near-black/68">
          At VYE Organic Coconut Water, we respect your privacy and are
          committed to protecting your personal information.
        </p>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-palm-green/10 bg-white px-6 py-4 shadow-[0_20px_60px_rgba(31,41,51,0.08)] sm:px-10 sm:py-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="border-b border-palm-green/10 py-7 last:border-b-0"
            >
              <h2 className="text-2xl font-black text-palm-green">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-near-black/68">
                {section.copy}
              </p>
              {section.items ? (
                <ul className="mt-4 grid gap-2 pl-5 text-base leading-7 text-near-black/68">
                  {section.items.map((item) => (
                    <li key={item} className="list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.note ? (
                <p className="mt-4 text-base font-semibold leading-8 text-near-black/68">
                  {section.note}
                </p>
              ) : null}
            </section>
          ))}
        </div>

        <div className="mt-8 text-base leading-8 text-near-black/68">
          <p>VYE Organic Coconut Water</p>
          <p>
            Email:{" "}
            <a
              href="mailto:info@drinkvye.com"
              className="font-bold text-palm-green underline decoration-vye-pink underline-offset-4"
            >
              info@drinkvye.com
            </a>
          </p>
          <p>
            Website:{" "}
            <a
              href="https://www.drinkvye.com"
              className="font-bold text-palm-green underline decoration-vye-pink underline-offset-4"
            >
              www.drinkvye.com
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
