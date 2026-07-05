import type { Metadata } from "next";
import BackedByStrip from "@/components/marketing/BackedByStrip";
import CopyableEmail from "@/components/marketing/CopyableEmail";
import FoundersSection from "@/components/marketing/FoundersSection";
import TeamSection from "@/components/marketing/TeamSection";

const TITLE = "Contact Zentic Health";
const DESCRIPTION =
  "Get in touch with Zentic Health as a patient, a GP practice, an investor, or otherwise.";

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

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 md:px-10 md:py-20">
      <h1 className="max-w-xl font-display text-3xl font-semibold leading-tight text-zentic-ink md:text-4xl">
        Interested in Zentic Health, as a patient, a GP practice, an investor,
        or otherwise?
      </h1>
      <p className="mt-3 font-sans text-base text-zentic-ink-soft">
        We&apos;d love to hear from you.
      </p>

      <div className="mt-10 flex flex-col gap-2">
        <CopyableEmail
          email="zentichealth@gmail.com"
          className="font-display text-2xl font-semibold text-zentic-purple-dark hover:underline"
        />
      </div>

      <div className="mt-16 border-t border-zentic-line pt-10">
        <FoundersSection />
      </div>

      <div className="mt-16 border-t border-zentic-line pt-10">
        <TeamSection />
      </div>

      <div className="mt-16 border-t border-zentic-line pt-10">
        <BackedByStrip />
      </div>
    </div>
  );
}
