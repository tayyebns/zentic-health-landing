import type { Metadata } from "next";

const TITLE = "Privacy Policy: Zentic Health";
const DESCRIPTION = "Zentic Health's privacy policy for this website.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Zentic Health" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 md:px-10 md:py-20">
      <h1 className="font-display text-3xl font-semibold leading-tight text-zentic-ink md:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 font-sans text-sm text-zentic-ink-soft">
        Last updated: 4 July 2026
      </p>

      <p className="mt-10 font-sans text-base leading-relaxed text-zentic-ink-soft">
        This website does not use cookies or analytics tracking.
      </p>

      <div className="mt-12 border-t border-zentic-line pt-10">
        <h2 className="font-display text-xl font-semibold text-zentic-ink">
          Contact and enquiries
        </h2>
        <p className="mt-3 font-sans text-base leading-relaxed text-zentic-ink-soft">
          If you email us at zentichealth@gmail.com, we may store the information you
          provide, such as your name, email address, and the content of your message,
          in an internal database. This is used only to track and respond to
          enquiries. We do not use this information for marketing, and we do not sell
          or share it with third parties.
        </p>
        <p className="mt-4 font-sans text-base leading-relaxed text-zentic-ink-soft">
          We keep this information only for as long as needed to manage the enquiry.
          You can ask us to access, correct, or delete any information we hold about
          you at any time by emailing zentichealth@gmail.com.
        </p>
      </div>

      <div className="mt-12 border-t border-zentic-line pt-10">
        <h2 className="font-display text-xl font-semibold text-zentic-ink">
          The Zentic Health product
        </h2>
        <p className="mt-3 font-sans text-base leading-relaxed text-zentic-ink-soft">
          This website is an informational page about Zentic Health, a product
          currently in development. It is separate from the Zentic Health application
          itself. Once the Zentic Health app is live and processing real patient data,
          a dedicated privacy notice covering that data, in line with UK GDPR and the
          Data Protection Act 2018, will apply and will be published at that time.
        </p>
      </div>

      <div className="mt-12 border-t border-zentic-line pt-10">
        <h2 className="font-display text-xl font-semibold text-zentic-ink">
          Changes to this policy
        </h2>
        <p className="mt-3 font-sans text-base leading-relaxed text-zentic-ink-soft">
          If how this website handles data changes in the future, this policy will be
          updated accordingly before that change takes effect.
        </p>
      </div>

      <div className="mt-12 border-t border-zentic-line pt-10">
        <h2 className="font-display text-xl font-semibold text-zentic-ink">Contact us</h2>
        <p className="mt-3 font-sans text-base leading-relaxed text-zentic-ink-soft">
          Questions about this policy:{" "}
          <a
            href="mailto:zentichealth@gmail.com"
            className="text-zentic-purple-dark underline underline-offset-2 hover:text-zentic-deep"
          >
            zentichealth@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
