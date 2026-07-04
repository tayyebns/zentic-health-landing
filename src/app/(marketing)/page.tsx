import type { Metadata } from "next";
import Link from "next/link";
import PatientSummaryMockup from "@/components/marketing/PatientSummaryMockup";
import HowItWorks from "@/components/marketing/HowItWorks";

const TITLE = "Zentic Health: structured health tracking for better GP conversations";
const DESCRIPTION =
  "Zentic turns day-to-day symptom and medication tracking into a structured summary a GP can actually use.";

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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-wider text-zentic-purple-dark">
              Health infrastructure for chronic conditions
            </p>
            <h1 className="max-w-xl font-display text-4xl font-semibold leading-[1.1] text-zentic-ink md:text-5xl">
              Your GP has ten minutes. Your condition has months of history.
            </h1>
            <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-zentic-ink-soft">
              Zentic turns day-to-day symptom and medication tracking into a structured
              summary a GP can actually use, shared securely, in the patient&apos;s own
              language.
            </p>
          </div>
          <div className="md:col-span-5">
            <PatientSummaryMockup />
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="border-y border-zentic-line bg-zentic-bg">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <p className="font-display text-2xl font-semibold leading-snug text-zentic-ink md:col-span-5 md:text-3xl">
              Chronic and complex conditions don&apos;t fit into a ten-minute slot.
            </p>
            <p className="font-sans text-base leading-relaxed text-zentic-ink-soft md:col-span-6 md:col-start-7">
              Patients are asked to recall weeks of symptoms, medication changes, and
              side effects on the spot, under pressure, in a second language, or
              both. Details get forgotten, simplified, or lost entirely, and the GP
              is left making decisions on an incomplete picture.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <h2 className="mb-10 font-display text-2xl font-semibold text-zentic-ink md:mb-14 md:text-3xl">
          How it works
        </h2>
        <HowItWorks />
      </section>

      {/* What makes it different */}
      <section className="border-y border-zentic-line bg-zentic-ink">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <h2 className="font-display text-2xl font-semibold leading-snug text-white md:col-span-6 md:text-3xl">
              This isn&apos;t a personal log. It&apos;s structured data a GP can use.
            </h2>
            <p className="font-sans text-base leading-relaxed text-white/70 md:col-span-5 md:col-start-8">
              Most tracking apps produce a diary for the patient. Zentic organises the
              same day-to-day entries into a timeline, medication record, and summary
              formatted for a clinical conversation, not a scroll of unstructured notes.
            </p>
          </div>
        </div>
      </section>

      {/* Language strip */}
      <section className="mx-auto max-w-4xl px-6 py-14 text-center md:px-10 md:py-16">
        <h2 className="font-display text-xl font-semibold text-zentic-ink md:text-2xl">
          Zentic Health speaks your language
        </h2>
        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-zentic-ink-soft md:text-base">
          Punjabi, Urdu, Gujarati, Bengali, Polish, Romanian, and any language you need.
        </p>
      </section>

      {/* Trust, light touch */}
      <section className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              label: "Multilingual",
              detail: "Real-time translation into any language.",
            },
            {
              label: "WCAG 2.2 AA",
              detail: "Designed to WCAG 2.2 AA accessibility guidelines.",
            },
            {
              label: "Private by design",
              detail: "Patients control what's shared, and with whom.",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <p className="font-sans text-sm font-semibold text-zentic-ink">
                {item.label}
              </p>
              <p className="font-sans text-sm leading-relaxed text-zentic-ink-soft">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-6 md:px-10 md:pb-28">
        <div className="flex flex-col items-start gap-6 border-t border-zentic-line pt-12 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-md font-display text-2xl font-semibold text-zentic-ink md:text-3xl">
            Interested in Zentic?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-zentic-deep px-7 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-zentic-purple-dark"
          >
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
