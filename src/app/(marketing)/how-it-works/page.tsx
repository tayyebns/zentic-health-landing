import type { Metadata } from "next";
import Link from "next/link";
import PatientSummaryMockup from "@/components/marketing/PatientSummaryMockup";
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
    question: "What is Zentic Health?",
    answer: (
      <p>
        Zentic is a health tracking platform for people living with chronic conditions. It
        gives you one place to record your symptoms, medications and day-to-day changes,
        then organises that information into a clear health history you can look back on
        and download as a PDF for your GP appointments.
      </p>
    ),
  },
  {
    question: "Who is Zentic for?",
    answer: (
      <>
        <p>
          Zentic is designed for people living with chronic conditions who want a clearer
          way to keep track of their health between appointments.
        </p>
        <p>
          Whether your symptoms change from day to day or you simply find it difficult to
          remember everything that&apos;s happened since your last appointment, Zentic helps
          you keep an accurate record as you go.
        </p>
      </>
    ),
  },
  {
    question: "When can I use Zentic?",
    answer: (
      <>
        <p>
          Zentic is designed to support you before, during and after your appointments,
          helping you build a continuous record of your health over time.
        </p>
        <p>
          <strong className="font-semibold text-ds-ink">Before your appointment</strong>, you
          can track symptoms, medications and changes in your health as they happen,
          building a clear history without having to rely on memory later.
        </p>
        <p>
          <strong className="font-semibold text-ds-ink">During your appointment</strong>, you
          can refer to your health history or bring your downloaded PDF summary with you.
          Zentic can also transcribe your consultation, helping you keep a record of what
          was discussed and incorporating relevant information from the appointment into
          your ongoing health history.
        </p>
        <p>
          <strong className="font-semibold text-ds-ink">After your appointment</strong>, you
          can continue tracking your symptoms, medications and changes in your health
          alongside information captured during your consultation, creating continuity
          from one appointment to the next.
        </p>
      </>
    ),
  },
  {
    question: "What can I track with Zentic?",
    answer: (
      <p>
        You can record symptoms, their severity, medications and notes about changes in
        your health. Your entries are organised over time, helping you build a clearer
        picture of what has been happening between appointments without having to rely on
        memory alone.
      </p>
    ),
  },
  {
    question: "How does the PDF health summary work?",
    answer: (
      <>
        <p>
          When you&apos;re ready, you can download a structured PDF summary based on the
          information you&apos;ve recorded in Zentic.
        </p>
        <p>
          It brings together your symptoms, medications and health history in a clear
          format designed to be easy to reference during a GP appointment. You decide when
          to generate a summary and what you do with it afterwards.
        </p>
      </>
    ),
  },
  {
    question: "Do I need to send my information to my GP in advance?",
    answer: (
      <>
        <p>
          No. Zentic does not automatically send your health information to your GP, GP
          surgery or anyone else.
        </p>
        <p>
          If you choose to download a PDF summary, you remain in control of whether you
          bring it to an appointment or share it with a healthcare professional.
        </p>
      </>
    ),
  },
  {
    question: "Does my GP need a Zentic account?",
    answer: (
      <>
        <p>
          No. Your GP does not need to create an account, download an app or connect their
          systems to Zentic.
        </p>
        <p>
          Your health summary is provided as a PDF, so you can simply bring it with you
          when you feel it would be helpful during a conversation about your health.
        </p>
      </>
    ),
  },
  {
    question: "What languages does Zentic support?",
    answer: (
      <>
        <p>
          Zentic is designed to make health tracking more accessible for people who are
          more comfortable communicating in a language other than English.
        </p>
        <p>
          You can record and understand your health information in your preferred
          language, helping you describe what you&apos;ve been experiencing in the language
          that feels most natural to you.
        </p>
      </>
    ),
  },
  {
    question: "Is my health information private and secure?",
    answer: (
      <>
        <p>
          Your health information is personal, and Zentic is designed with that in mind.
          Privacy and patient control are built into how the platform works, with UK GDPR
          and Data Protection Act 2018 principles considered throughout its design.
        </p>
        <p>
          Your information is not automatically shared with your GP or other healthcare
          providers. You stay in control of when you choose to generate, download or share
          a health summary.
        </p>
      </>
    ),
  },
  {
    question: "Can I edit something after I've logged it?",
    answer: (
      <>
        <p>
          Yes. If you make a mistake, remember something later or need to correct an
          entry, you can update the information you&apos;ve recorded.
        </p>
        <p>
          Your health can be complicated, and keeping a useful record shouldn&apos;t depend
          on getting every detail perfect the first time.
        </p>
      </>
    ),
  },
  {
    question: "Does Zentic diagnose medical conditions or provide medical advice?",
    answer: (
      <>
        <p>
          No. Zentic does not diagnose conditions, recommend treatments or replace
          professional medical advice.
        </p>
        <p>
          Zentic&apos;s role is to help you keep a clearer, more structured record of your
          own health over time. Decisions about your care should always be made with an
          appropriately qualified healthcare professional.
        </p>
      </>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <div className="py-14 md:py-20">
      <Reveal className="mx-auto max-w-6xl px-5 md:px-10">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
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
          </div>
          <div className="md:col-span-5">
            <PatientSummaryMockup />
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-6xl border-t border-ds-border px-5 pt-14 md:px-10">
        <div className="max-w-3xl">
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
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-6xl border-t border-ds-border px-5 pt-14 md:px-10">
        <div className="max-w-3xl">
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
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-6xl border-t border-ds-border px-5 pt-14 md:px-10">
        <div className="max-w-3xl">
          <h2 className="font-ds text-ds-h2 text-ds-ink">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-ds-border border-y border-ds-border">
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-16 max-w-6xl px-5 md:px-10">
        <div className="max-w-3xl">
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
        </div>
      </Reveal>
    </div>
  );
}
