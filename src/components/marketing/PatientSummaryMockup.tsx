const TIMELINE = [
  { date: "2 Jul", label: "Migraine, severe", tone: "#C4694E" },
  { date: "28 Jun", label: "Migraine, moderate", tone: "#C99A3E" },
  { date: "24 Jun", label: "Nausea, mild", tone: "#7B9E6E" },
  { date: "19 Jun", label: "Migraine, moderate", tone: "#C99A3E" },
];

const MEDICATIONS = [
  { name: "Sumatriptan 50mg", adherence: "Taken 6/7 days" },
  { name: "Propranolol 40mg", adherence: "Taken 7/7 days" },
];

export default function PatientSummaryMockup() {
  return (
    <div
      className="mx-auto w-full max-w-[320px] rounded-[28px] border border-zentic-line bg-white shadow-phone"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-4 p-5">
        {/* Status bar */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-zentic-ink-soft">
            Patient summary
          </span>
          <span className="rounded-full bg-zentic-purple-light px-2.5 py-1 font-sans text-[10px] font-semibold text-zentic-purple-dark">
            Last 30 days
          </span>
        </div>

        {/* Symptom timeline */}
        <div>
          <p className="mb-2 font-sans text-[11px] font-semibold text-zentic-ink-soft">
            Symptom timeline
          </p>
          <div className="flex flex-col gap-2">
            {TIMELINE.map((entry) => (
              <div key={entry.date} className="flex items-center gap-2.5">
                <span className="w-9 flex-shrink-0 font-sans text-[10px] text-zentic-ink-soft/70">
                  {entry.date}
                </span>
                <span
                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: entry.tone }}
                />
                <span className="font-sans text-[11px] text-zentic-ink">
                  {entry.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-zentic-line" />

        {/* Medications */}
        <div>
          <p className="mb-2 font-sans text-[11px] font-semibold text-zentic-ink-soft">
            Medications
          </p>
          <div className="flex flex-col gap-2">
            {MEDICATIONS.map((med) => (
              <div key={med.name} className="flex items-center justify-between">
                <span className="font-sans text-[11px] text-zentic-ink">
                  {med.name}
                </span>
                <span className="font-sans text-[10px] text-zentic-ink-soft/70">
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
          className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-zentic-deep py-3 font-sans text-xs font-semibold text-white"
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
