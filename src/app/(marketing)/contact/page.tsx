import type { Metadata } from "next";
import BackedByStrip from "@/components/marketing/BackedByStrip";
import CopyableEmail from "@/components/marketing/CopyableEmail";
import FoundersSection from "@/components/marketing/FoundersSection";
import TeamSection from "@/components/marketing/TeamSection";
import Reveal from "@/components/marketing/Reveal";

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
    <div className="mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-20">
      <Reveal>
        <h1 className="max-w-xl text-[32px] font-bold leading-tight tracking-[-0.02em] text-ds-ink md:text-[40px]">
          Interested in Zentic Health, as a patient, a GP practice, an investor,
          or otherwise?
        </h1>
        <p className="mt-3 font-ds text-ds-body-lg text-ds-ink-secondary">
          We&apos;d love to hear from you.
        </p>

        <div className="mt-10 flex flex-col gap-2">
          <CopyableEmail
            email="zentichealth@gmail.com"
            className="font-ds text-[22px] font-semibold tracking-[-0.02em] text-ds-primary hover:underline"
          />
        </div>
      </Reveal>

      <Reveal className="mt-16 border-t border-ds-border pt-10">
        <FoundersSection />
      </Reveal>

      <Reveal className="mt-16 border-t border-ds-border pt-10">
        <TeamSection />
      </Reveal>

      <Reveal className="mt-16 border-t border-ds-border pt-10">
        <BackedByStrip />
      </Reveal>
    </div>
  );
}
