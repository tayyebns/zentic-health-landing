const TIMELINE = [
  { date: "2 Jul", label: "Migraine, severe", tone: "bg-ds-alert" },
  { date: "28 Jun", label: "Migraine, moderate", tone: "bg-ds-warning" },
  { date: "24 Jun", label: "Nausea, mild", tone: "bg-ds-success" },
  { date: "19 Jun", label: "Migraine, moderate", tone: "bg-ds-warning" },
];

const MEDICATIONS = [
  { name: "Sumatriptan 50mg", adherence: "Taken 6/7 days" },
  { name: "Propranolol 40mg", adherence: "Taken 7/7 days" },
];

export default function PatientSummaryMockup() {
  return (
    <div
      className="mx-auto w-full max-w-[320px] rounded-ds-xl border border-ds-border bg-ds-surface shadow-ds-card"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-4 p-4">
        {/* Status bar */}
        <div className="flex items-center justify-between">
          <span className="font-ds text-[11px] font-semibold uppercase tracking-wide text-ds-ink-secondary">
            Patient summary
          </span>
          <span className="rounded-ds-sm bg-ds-primary-tint px-2.5 py-1 font-ds text-[10px] font-semibold text-ds-primary">
            Last 30 days
          </span>
        </div>

        {/* Symptom timeline */}
        <div>
          <p className="mb-2 font-ds text-[11px] font-semibold text-ds-ink-secondary">
            Symptom timeline
          </p>
          <div className="flex flex-col gap-2">
            {TIMELINE.map((entry) => (
              <div key={entry.date} className="flex items-center gap-2.5">
                <span className="w-9 flex-shrink-0 font-ds text-[10px] text-ds-ink-secondary">
                  {entry.date}
                </span>
                <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${entry.tone}`} />
                <span className="font-ds text-[11px] text-ds-ink">
                  {entry.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-ds-border" />

        {/* Medications */}
        <div>
          <p className="mb-2 font-ds text-[11px] font-semibold text-ds-ink-secondary">
            Medications
          </p>
          <div className="flex flex-col gap-2">
            {MEDICATIONS.map((med) => (
              <div key={med.name} className="flex items-center justify-between">
                <span className="font-ds text-[11px] text-ds-ink">
                  {med.name}
                </span>
                <span className="font-ds text-[10px] text-ds-ink-secondary">
                  {med.adherence}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Share with GP action */}
        <button
          type="button"
          tabIndex={-1}
          className="mt-1 flex items-center justify-center gap-2 rounded-ds-md bg-ds-primary py-3 font-ds text-ds-caption font-semibold text-white"
        >
          Share with GP
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
