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
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-zentic-purple-dark">
          For GP practices
        </p>

        {/* Opening statement */}
        <h1 className="max-w-2xl font-display text-3xl font-semibold leading-tight text-zentic-ink md:text-[2.15rem]">
          Patients arrive with structured, relevant history, not a rambling
          verbal account reconstructed in a ten-minute slot.
        </h1>
      </div>

      <div className="mt-14 border-t border-zentic-line pt-14">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          {/* What you receive */}
          <h2 className="font-display text-xl font-semibold text-zentic-ink">
            What you receive
          </h2>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-zentic-ink-soft">
            At the start of a consultation, an access code unlocks a
            structured summary: patient details, key metrics, symptom trends,
            medication adherence, and a dated event history. Below is the
            actual format.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-5xl px-6 md:px-10">
          {/* Preview label and dashboard mockup share one continuous rounded
              block: the wrapper owns the border/radius, the pieces inside
              are flush and square where they meet. */}
          <div className="overflow-hidden rounded-2xl border border-zentic-line">
            <div
              className="flex items-center gap-2.5 px-4 py-3"
              style={{ backgroundColor: "#FBF1DC" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92661E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="font-sans text-sm font-semibold" style={{ color: "#92661E" }}>
                Preview: structured summary format currently in development.
              </p>
            </div>
            <GPDashboardMockup />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-3xl border-t border-zentic-line px-6 pt-14 md:px-10">
        {/* Access & governance */}
        <h2 className="font-display text-xl font-semibold text-zentic-ink">
          Access &amp; governance
        </h2>
        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-zentic-ink-soft">
          Built with information-governance risk in mind, not as an afterthought.
        </p>
        <dl className="mt-8 divide-y divide-zentic-line border-y border-zentic-line">
          {GOVERNANCE.map((item) => (
            <div key={item.title} className="grid grid-cols-1 gap-1.5 py-6 md:grid-cols-12 md:gap-6">
              <dt className="font-sans text-sm font-semibold text-zentic-ink md:col-span-4">
                {item.title}
              </dt>
              <dd className="font-sans text-sm leading-relaxed text-zentic-ink-soft md:col-span-8">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto mt-16 max-w-3xl border-t border-zentic-line px-6 pt-14 md:px-10">
        {/* Clinical safety framing */}
        <h2 className="font-display text-xl font-semibold text-zentic-ink">
          Clinical safety
        </h2>
        <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-zentic-ink-soft">
          Zentic is a communication tool, not a diagnostic device. It does not
          generate AI-driven clinical recommendations, and it does not produce
          automated alerts that could be read as medical advice. It presents
          what the patient recorded, structured for faster reading. Clinical
          judgement remains entirely with the GP.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-3xl border-t border-zentic-line px-6 pt-14 md:px-10">
        {/* Current status */}
        <h2 className="font-display text-xl font-semibold text-zentic-ink">
          Current status
        </h2>
        <p className="mt-3 font-sans text-sm leading-relaxed text-zentic-ink-soft">
          In early conversations with GP practices in Birmingham.
        </p>
      </div>
    </div>
  );
}
