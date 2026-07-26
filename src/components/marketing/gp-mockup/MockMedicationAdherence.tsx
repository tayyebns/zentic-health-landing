import { MEDICATIONS } from "./data";

const STATUS_CONFIG = {
  taken: {
    label: "Taken",
    color: "#16A34A",
    bg: "#E8F6ED",
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  skipped: {
    label: "Skipped",
    color: "#DC2626",
    bg: "#FCEAEA",
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  pending: {
    label: "Not yet actioned",
    color: "#6B7280",
    bg: "#F1F0F9",
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
      </svg>
    ),
  },
} as const;

const STATUS_ORDER = ["skipped", "taken", "pending"] as const;

export default function MockMedicationAdherence() {
  const taken = MEDICATIONS.filter((m) => m.status === "taken").length;
  const skipped = MEDICATIONS.filter((m) => m.status === "skipped").length;
  const pending = MEDICATIONS.filter((m) => m.status === "pending").length;
  const counts = { taken, skipped, pending };

  const sortedMedications = [...MEDICATIONS].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
  );

  return (
    <div className="self-start rounded-ds-lg bg-ds-surface p-4 shadow-ds-card md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-ds text-ds-body font-semibold text-ds-ink">
          Medication Adherence
        </h4>
        <span className="font-ds text-[11px] text-ds-ink-secondary">recent activity</span>
      </div>

      <p className="font-ds text-ds-body text-ds-ink">
        <span className="font-semibold">{taken} of {MEDICATIONS.length}</span> taken
      </p>

      {/* Status legend — icon + label + count kept as one tight group per status */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {STATUS_ORDER.map((key) => {
          const cfg = STATUS_CONFIG[key];
          return (
            <div key={key} className="flex items-center gap-1.5">
              <span
                className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: cfg.bg, color: cfg.color }}
              >
                {cfg.icon}
              </span>
              <span className="font-ds text-ds-caption text-ds-ink-secondary">
                {cfg.label} <span className="font-semibold text-ds-ink">{counts[key]}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 max-h-72 space-y-2.5 overflow-y-auto border-t border-ds-border pt-4 pr-1">
        {sortedMedications.map((med) => {
          const cfg = STATUS_CONFIG[med.status];
          const isSkipped = med.status === "skipped";
          return (
            <div key={med.name} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-ds text-ds-caption font-semibold text-ds-ink">
                  {med.name}
                </p>
                <p className="truncate font-ds text-[10px] text-ds-ink-secondary">
                  {med.detail}
                </p>
              </div>
              <span
                className={`flex flex-shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-ds text-[10px] ${
                  isSkipped ? "font-bold" : "font-semibold"
                }`}
                style={{
                  backgroundColor: cfg.bg,
                  color: cfg.color,
                  boxShadow: isSkipped ? `inset 0 0 0 1px ${cfg.color}` : undefined,
                }}
              >
                <span className="flex-shrink-0">{cfg.icon}</span>
                {cfg.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
