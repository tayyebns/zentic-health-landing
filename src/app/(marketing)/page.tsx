import type { Metadata } from "next";
import Link from "next/link";
import PatientSummaryMockup from "@/components/marketing/PatientSummaryMockup";
import HowItWorks from "@/components/marketing/HowItWorks";
import Wordmark from "@/components/Wordmark";

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

const TRUST_CHIPS = ["WCAG 2.2 AA", "Multilingual", "GDPR-minded"];

const FEATURES = [
  {
    title: "Multilingual",
    detail: "Real-time translation into any language, so nothing gets lost between patient and GP.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: "WCAG 2.2 AA",
    detail: "Designed and tested to WCAG 2.2 AA accessibility guidelines from the ground up.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Private by design",
    detail: "Patients control what's shared, and with whom, before any summary is generated.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Wordmark size="lg" animate />
            <p className="mb-4 mt-6 font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-ink-secondary">
              Health infrastructure for chronic conditions
            </p>
            <h1 className="max-w-xl text-[40px] font-bold leading-[1.05] tracking-[-0.02em] text-ds-ink md:text-[56px]">
              Your GP has ten minutes. Your condition has months of history.
            </h1>
            <p className="mt-6 max-w-md font-ds text-ds-body-lg text-ds-ink-secondary">
              Zentic turns day-to-day symptom and medication tracking into a structured
              summary a GP can actually use, shared securely, in the patient&apos;s own
              language.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-ds-md bg-ds-primary px-6 py-3 font-ds text-ds-body font-semibold text-white transition-transform duration-150 hover:opacity-95 active:scale-[0.97]"
              >
                Get in touch
              </Link>
              <Link
                href="/for-gps"
                className="inline-flex min-h-[44px] items-center justify-center rounded-ds-md bg-ds-secondary-bg px-6 py-3 font-ds text-ds-body font-semibold text-ds-primary transition-transform duration-150 hover:opacity-90 active:scale-[0.97]"
              >
                For GP practices
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {TRUST_CHIPS.map((chip, i) => (
                <span
                  key={chip}
                  className={`rounded-ds-sm px-3 py-1.5 font-ds text-ds-caption font-medium ${
                    i % 2 === 0 ? "bg-ds-primary-tint text-ds-primary" : "bg-ds-accent-soft text-ds-primary"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            <PatientSummaryMockup />
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="border-y border-ds-border bg-ds-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <p className="font-ds text-ds-h2 leading-snug text-ds-ink md:col-span-5 md:text-[28px]">
              Chronic and complex conditions don&apos;t fit into a ten-minute slot.
            </p>
            <p className="font-ds text-ds-body-lg text-ds-ink-secondary md:col-span-6 md:col-start-7">
              Patients are asked to recall weeks of symptoms, medication changes, and
              side effects on the spot, under pressure, in a second language, or
              both. Details get forgotten, simplified, or lost entirely, and the GP
              is left making decisions on an incomplete picture.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-20">
        <h2 className="mb-10 font-ds text-ds-h2 text-ds-ink md:mb-14 md:text-[28px]">
          How it works
        </h2>
        <HowItWorks />
      </section>

      {/* Feature/benefit cards */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="rounded-ds-xl border border-ds-border bg-ds-surface p-4 shadow-ds-card"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-full ${
                  i % 2 === 0 ? "bg-ds-accent-soft text-ds-primary" : "bg-ds-primary-tint text-ds-primary"
                }`}
              >
                {feature.icon}
              </div>
              <h3 className="font-ds text-ds-title text-ds-ink">{feature.title}</h3>
              <p className="mt-2 font-ds text-ds-body text-ds-ink-secondary">
                {feature.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What makes it different */}
      <section className="border-y border-ds-border bg-ds-primary">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <h2 className="font-ds text-ds-h2 leading-snug text-white md:col-span-6 md:text-[28px]">
              This isn&apos;t a personal log. It&apos;s structured data a GP can use.
            </h2>
            <p className="font-ds text-ds-body-lg text-white/70 md:col-span-5 md:col-start-8">
              Most tracking apps produce a diary for the patient. Zentic organises the
              same day-to-day entries into a timeline, medication record, and summary
              formatted for a clinical conversation, not a scroll of unstructured notes.
            </p>
          </div>
        </div>
      </section>

      {/* Language strip */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-16">
        <h2 className="font-ds text-ds-h2 text-ds-ink">
          Zentic Health speaks your language
        </h2>
        <p className="mt-5 max-w-2xl font-ds text-ds-body-lg text-ds-ink-secondary">
          Punjabi, Urdu, Gujarati, Bengali, Polish, Romanian, and any language you need.
        </p>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-6 md:px-10 md:pb-28">
        <div className="flex flex-col items-start gap-6 border-t border-ds-border pt-12 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-md font-ds text-ds-h2 text-ds-ink md:text-[28px]">
            Interested in Zentic?
          </h2>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-ds-md bg-ds-primary px-7 py-3 font-ds text-ds-body font-semibold text-white transition-transform duration-150 hover:opacity-95 active:scale-[0.97]"
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
