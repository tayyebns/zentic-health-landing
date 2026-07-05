"use client";

import { useMemo } from "react";
import { useZenticStore } from "@/lib/store";

type EventType = "symptom" | "voice_note" | "consultation" | "gp_share";

interface TimelineEvent {
  id: string;
  date: string;
  type: EventType;
  label: string;
  detail: string;
}

const TYPE_CONFIG: Record<
  EventType,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  symptom: {
    color: "#9485D4",
    bg: "#EDEAF6",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
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
  consultation: {
    color: "#10B981",
    bg: "#D1FAE5",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  gp_share: {
    color: "#3B82F6",
    bg: "#DBEAFE",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
};

function fmtDate(d: string): string {
  const [, m, day] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${parseInt(day)}`;
}

export default function HealthEventTimeline() {
  const symptoms = useZenticStore((s) => s.symptoms);

  const events = useMemo((): TimelineEvent[] => {
    const list: TimelineEvent[] = [];

    symptoms.forEach((s) => {
      list.push({
        id: `ev-sym-${s.id}`,
        date: s.date,
        type: "symptom",
        label: s.symptom,
        detail: `Severity ${s.severity}/10 — ${s.description.slice(0, 60)}${s.description.length > 60 ? "…" : ""}`,
      });
      if (s.hasVoiceNote) {
        list.push({
          id: `ev-vn-${s.id}`,
          date: s.date,
          type: "voice_note",
          label: "Voice note attached",
          detail: `Recording linked to ${s.symptom} entry`,
        });
      }
    });

    // Fixed consultation event (May 12 — from seedAppointmentTranscript context)
    list.push({
      id: "ev-consult-001",
      date: "2026-05-12",
      type: "consultation",
      label: "GP consultation recorded",
      detail: "10-line transcript captured via Appointment Capture screen",
    });

    // Fixed GP share event (May 27 — today, when patient tapped Share)
    list.push({
      id: "ev-share-001",
      date: "2026-05-27",
      type: "gp_share",
      label: "Health data shared with GP",
      detail: "Patient confirmed access via GP Bridge — code ZEN-4821",
    });

    return list.sort((a, b) => b.date.localeCompare(a.date));
  }, [symptoms]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-base font-semibold text-zentic-purple-dark">
          Health Event Timeline
        </h3>
        <span className="font-sans text-xs text-gray-400">most recent first</span>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
        {(Object.entries(TYPE_CONFIG) as [EventType, typeof TYPE_CONFIG[EventType]][]).map(([type, cfg]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: cfg.bg, color: cfg.color }}
            >
              {cfg.icon}
            </div>
            <span className="font-sans text-[10px] text-gray-500 capitalize">
              {type.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>

      {/* Timeline list */}
      <div className="relative">
        {/* Vertical rule */}
        <div
          className="absolute top-0 bottom-0 left-[17px] w-px"
          style={{ backgroundColor: "#F3F4F6" }}
        />

        <div className="space-y-3 overflow-y-auto" style={{ maxHeight: 340 }}>
          {events.map((ev) => {
            const cfg = TYPE_CONFIG[ev.type];
            return (
              <div key={ev.id} className="flex gap-3 items-start relative">
                {/* Icon node */}
                <div
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center flex-shrink-0 z-10"
                  style={{
                    backgroundColor: cfg.bg,
                    color: cfg.color,
                    boxShadow: `inset 0 0 0 1.5px ${cfg.color}40`,
                  }}
                >
                  {cfg.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <span className="font-sans text-xs font-semibold text-gray-700 leading-snug">
                      {ev.label}
                    </span>
                    <span className="font-sans text-[10px] text-gray-400 flex-shrink-0">
                      {fmtDate(ev.date)}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-gray-400 leading-snug mt-0.5">
                    {ev.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="font-sans text-[10px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
        {events.length} events in the last 4 weeks
      </p>
    </div>
  );
}
