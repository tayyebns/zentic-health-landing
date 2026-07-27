import type { Metadata } from "next";
import Link from "next/link";
import PatientSummaryMockup from "@/components/marketing/PatientSummaryMockup";
import HowItWorks from "@/components/marketing/HowItWorks";
import FaqItem from "@/components/marketing/FaqItem";
import Reveal from "@/components/marketing/Reveal";

const TITLE = "How Zentic Health works: track, organise, download";
const DESCRIPTION =
  "From day-to-day symptom and medication tracking to a clean, structured PDF summary a GP can actually use.";

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

const DETAILS = [
  {
    title: "Track",
    detail:
      "Patients log symptoms, medications, and notes as they happen, in their own language, not reconstructed from memory weeks later.",
  },
  {
    title: "Organise",
    detail:
      "Entries are structured into a timeline: what changed, when, and how it's trending, alongside a medication record, instead of a scroll of unstructured notes.",
  },
  {
    title: "Download",
    detail:
      "Patients can optionally download a clean PDF summary at any time, ready to bring to their next appointment.",
  },
];

const WITHOUT_STRUCTURE =
  "“It's been a rough few weeks, I think I had headaches maybe three or four times? Took something for it, I don't remember exactly what, and I think I missed a dose at some point. Felt a bit sick after lunch a few days too.”";

const WITH_ZENTIC = [
  "4 migraine entries logged, severity 4–8/10, over the last 4 weeks",
  "Sumatriptan 50mg: taken 6 of 7 days",
  "Propranolol 40mg: taken 7 of 7 days",
  "Nausea noted once, same day as a missed dose",
];

const FAQS = [
  {
    question: "Do I need to share anything with my GP in advance?",
    answer:
      "No. Nothing is shared automatically. You can choose to download a PDF summary and bring it to your appointment yourself.",
  },
  {
    question: "What languages does Zentic support?",
    answer:
      "Punjabi, Urdu, Gujarati, Bengali, Polish, Romanian, and any language you need. You can log entries in your own language.",
  },
  {
    question: "Does my GP need to install anything?",
    answer:
      "No. The PDF summary is a normal document you can print, email, or show on your phone. There's nothing for your GP to set up.",
  },
  {
    question: "Is my health data secure?",
    answer:
      "Zentic is built with GDPR and UK DPA 2018 principles at its core. You control what's tracked, and whether you generate a summary at all.",
  },
  {
    question: "Can I edit entries after logging them?",
    answer: "Yes, entries can be corrected at any time before you generate a summary.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="py-14 md:py-20">
      <Reveal className="mx-auto max-w-3xl px-5 md:px-10">
        <p className="mb-3 font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-primary">
          How it works
        </p>
        <h1 className="max-w-2xl text-[32px] font-bold leading-tight tracking-[-0.02em] text-ds-ink md:text-[40px]">
          From daily entries to a clean summary, in three steps.
        </h1>
        <p className="mt-4 max-w-xl font-ds text-ds-body-lg text-ds-ink-secondary">
          Zentic turns day-to-day symptom and medication tracking into a structured
          summary, so nothing gets forgotten, simplified, or lost between appointments.
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-14 max-w-5xl px-5 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <HowItWorks />
          </div>
          <div className="md:col-span-5">
            <PatientSummaryMockup />
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-3xl border-t border-ds-border px-5 pt-14 md:px-10">
        <h2 className="font-ds text-ds-h2 text-ds-ink">
          The detail
        </h2>
        <dl className="mt-8 divide-y divide-ds-border border-y border-ds-border">
          {DETAILS.map((item) => (
            <div key={item.title} className="grid grid-cols-1 gap-1.5 py-6 md:grid-cols-12 md:gap-6">
              <dt className="font-ds text-ds-title text-ds-ink md:col-span-4">
                {item.title}
              </dt>
              <dd className="font-ds text-ds-body text-ds-ink-secondary md:col-span-8">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-3xl border-t border-ds-border px-5 pt-14 md:px-10">
        <h2 className="font-ds text-ds-h2 text-ds-ink">
          Why structure beats a diary
        </h2>
        <p className="mt-3 max-w-xl font-ds text-ds-body text-ds-ink-secondary">
          The same few weeks, recalled from memory versus organised by Zentic.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-ds-lg border border-ds-border bg-ds-surface p-4 shadow-ds-card">
            <p className="font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-ink-secondary">
              Without structure
            </p>
            <p className="mt-3 font-ds text-ds-body italic text-ds-ink-secondary">
              {WITHOUT_STRUCTURE}
            </p>
          </div>
          <div className="rounded-ds-lg border border-ds-border bg-ds-surface p-4 shadow-ds-card">
            <p className="font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-primary">
              With Zentic
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {WITH_ZENTIC.map((line) => (
                <li key={line} className="flex items-start gap-2 font-ds text-ds-body text-ds-ink">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ds-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-3xl border-t border-ds-border px-5 pt-14 md:px-10">
        <h2 className="font-ds text-ds-h2 text-ds-ink">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-ds-border border-y border-ds-border">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-3xl px-5 md:px-10">
        <div className="flex flex-col items-start gap-6 border-t border-ds-border pt-12 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-md font-ds text-ds-h2 text-ds-ink">
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
      </Reveal>
    </div>
  );
}
