import type { Metadata } from "next";
import GPDashboardMockup from "@/components/marketing/gp-mockup/GPDashboardMockup";

const TITLE = "Zentic Health for GP Practices: governed, audited patient summaries";
const DESCRIPTION =
  "Time-limited access codes, full audit logging, and Row-Level Security, built for GP practices evaluating information-governance risk.";

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

const GOVERNANCE = [
  {
    title: "Time-limited, scoped access codes",
    detail:
      "GPs are given a single-use access code that expires within hours, not a standing login. Each code exposes only the summary the patient chose to share.",
  },
  {
    title: "Every access audited and logged",
    detail:
      "Every time a summary is viewed, it's recorded: who, when, and what was accessed, creating an audit trail independent of the practice's own systems.",
  },
  {
    title: "Row-Level Security enforced at the database level",
    detail:
      "Access control isn't just an application-layer check. RLS policies at the database level mean a patient's records are unreachable by anyone outside an active, valid access grant, even in the event of an application bug.",
  },
  {
    title: "Patient controls what's shared",
    detail:
      "Patients choose which entries and time range are included in a given summary before generating an access code. Nothing is shared by default.",
  },
];

export default function ForGPsPage() {
  return (
    <div className="py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <p className="mb-3 font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-primary">
          For GP practices
        </p>

        {/* Opening statement */}
        <h1 className="max-w-2xl text-[32px] font-bold leading-tight tracking-[-0.02em] text-ds-ink md:text-[40px]">
          Patients arrive with structured, relevant history, not a rambling
          verbal account reconstructed in a ten-minute slot.
        </h1>
      </div>

      <div className="mt-14 border-t border-ds-border pt-14">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          {/* What you receive */}
          <h2 className="font-ds text-ds-h2 text-ds-ink">
            What you receive
          </h2>
          <p className="mt-3 max-w-xl font-ds text-ds-body text-ds-ink-secondary">
            At the start of a consultation, an access code unlocks a
            structured summary: patient details, key metrics, symptom trends,
            medication adherence, and a dated event history. Below is the
            actual format.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl px-5 md:px-10">
          {/* Preview label and dashboard mockup share one continuous rounded
              block: the wrapper owns the border/radius, the pieces inside
              are flush and square where they meet. */}
          <div className="overflow-hidden rounded-ds-xl border border-ds-border">
            <div className="flex items-center gap-2.5 bg-ds-warning-tint px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="font-ds text-ds-body font-semibold text-ds-warning">
                Preview: structured summary format currently in development.
              </p>
            </div>
            <GPDashboardMockup />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-3xl border-t border-ds-border px-5 pt-14 md:px-10">
        {/* Access & governance */}
        <h2 className="font-ds text-ds-h2 text-ds-ink">
          Access &amp; governance
        </h2>
        <p className="mt-3 max-w-xl font-ds text-ds-body text-ds-ink-secondary">
          Built with information-governance risk in mind, not as an afterthought.
        </p>
        <dl className="mt-8 divide-y divide-ds-border border-y border-ds-border">
          {GOVERNANCE.map((item) => (
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

      <div className="mt-16 bg-ds-surface py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          {/* Clinical safety framing, called out rather than another stacked heading block */}
          <h2 className="font-ds text-ds-h2 text-ds-ink">
            Clinical safety
          </h2>
          <p className="mt-3 max-w-xl font-ds text-ds-body text-ds-ink-secondary">
            Zentic is a communication tool, not a diagnostic device. It does not
            generate AI-driven clinical recommendations, and it does not produce
            automated alerts that could be read as medical advice. It presents
            what the patient recorded, structured for faster reading. Clinical
            judgement remains entirely with the GP.
          </p>

          <p className="mt-6 flex items-center gap-2 font-ds text-ds-caption text-ds-ink-secondary">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ds-accent" />
            Current status: in early conversations with GP practices in Birmingham.
          </p>
        </div>
      </div>
    </div>
  );
}
