type EventType = "symptom" | "medication" | "voice_note" | "access";

interface TimelineEvent {
  date: string;
  type: EventType;
  label: string;
  detail: string;
}

const TYPE_CONFIG: Record<EventType, { color: string; bg: string; icon: React.ReactNode }> = {
  symptom: {
    color: "#9485D4",
    bg: "#EDEAF6",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  medication: {
    color: "#C99A3E",
    bg: "#FBF1DC",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeLinejoin="round" />
      </svg>
    ),
  },
  voice_note: {
    color: "#F59E0B",
    bg: "#FEF3C7",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      </svg>
    ),
  },
  access: {
    color: "#3B82F6",
    bg: "#DBEAFE",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
};

const EVENTS: TimelineEvent[] = [
  {
    date: "2 Jul",
    type: "access",
    label: "Health data shared with GP",
    detail: "Patient confirmed access via GP Bridge · code ZH-4Q7T-K2M9-XR3B",
  },
  {
    date: "2 Jul",
    type: "medication",
    label: "Omeprazole",
    detail: "Not yet taken this morning.",
  },
  {
    date: "2 Jul",
    type: "symptom",
    label: "Migraine",
    detail: "Severity 8/10 reported.",
  },
  {
    date: "28 Jun",
    type: "symptom",
    label: "Migraine",
    detail: "Severity 6/10 reported.",
  },
  {
    date: "24 Jun",
    type: "voice_note",
    label: "Voice note attached",
    detail: "Recording linked to Migraine entry, 24 Jun.",
  },
  {
    date: "18 Jun",
    type: "symptom",
    label: "Nausea",
    detail: "Severity 3/10 reported, same day as Metformin dose.",
  },
  {
    date: "12 Jun",
    type: "symptom",
    label: "Migraine",
    detail: "Severity 6/10 reported.",
  },
  {
    date: "5 Jun",
    type: "symptom",
    label: "Migraine",
    detail: "Severity 4/10 reported.",
  },
];

export default function MockEventTimeline() {
  return (
    <div className="rounded-2xl bg-white p-4 md:p-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-display text-sm font-semibold text-zentic-ink">
          Health Event Timeline
        </h4>
        <span className="font-sans text-[11px] text-zentic-ink-soft/70">most recent first</span>
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-[13px] top-0 w-px" style={{ backgroundColor: "#F3F1F8" }} />
        <div className="space-y-3">
          {EVENTS.map((ev, i) => {
            const cfg = TYPE_CONFIG[ev.type];
            return (
              <div key={i} className="relative flex items-start gap-3">
                <div
                  className="z-10 flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: cfg.bg, color: cfg.color }}
                >
                  {cfg.icon}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-sans text-xs font-semibold text-zentic-ink">
                      {ev.label}
                    </span>
                    <span className="flex-shrink-0 font-sans text-[10px] text-zentic-ink-soft/60">
                      {ev.date}
                    </span>
                  </div>
                  <p className="mt-0.5 font-sans text-[11px] leading-snug text-zentic-ink-soft">
                    {ev.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
