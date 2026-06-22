import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Vye",
  description: "How Vye collects, uses, and protects website information.",
};

const sections = [
  {
    title: "Information we collect",
    copy: "We may collect information you provide during checkout, through wholesale applications, or when contacting us. This can include your name, email, phone number, shipping address, business information, and order details.",
  },
  {
    title: "How information is used",
    copy: "We use information to process payments and orders, arrange shipping, respond to inquiries, evaluate wholesale applications, send transactional messages, prevent fraud, and operate the website.",
  },
  {
    title: "Service providers",
    copy: "Payment and checkout information is processed through Stripe. Transactional and wholesale inquiry emails may be delivered through Resend. Store-location maps use Leaflet and OpenStreetMap services. These providers process information under their own privacy terms.",
  },
  {
    title: "Cart storage",
    copy: "The website stores cart information in your browser’s local storage so your selections remain available between visits. You can remove this information by clearing your cart or browser data.",
  },
  {
    title: "Sharing and retention",
    copy: "We do not sell personal information. We share it only with service providers and business partners needed to fulfill the purposes described above, or where required by law. We retain information only as long as reasonably necessary for business, legal, and accounting purposes.",
  },
  {
    title: "Your choices",
    copy: "You may request access to, correction of, or deletion of personal information, subject to applicable legal and recordkeeping requirements.",
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
          Last updated June 2026
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
            </section>
          ))}
        </div>

        <p className="mt-8 text-base leading-8 text-near-black/68">
          Privacy questions may be sent to{" "}
          <a
            href="mailto:info@drinkvye.com"
            className="font-bold text-palm-green underline decoration-vye-pink underline-offset-4"
          >
            info@drinkvye.com
          </a>
          .
        </p>
      </article>
    </div>
  );
}
