"use client";

import { useMemo } from "react";
import { useZenticStore } from "@/lib/store";

export default function QuickStats() {
  const symptoms = useZenticStore((s) => s.symptoms);
  const medications = useZenticStore((s) => s.medications);

  const stats = useMemo(() => {
    const total = symptoms.length;
    const voiceNotes = symptoms.filter((s) => s.hasVoiceNote).length;
    const avgSev =
      total > 0
        ? (symptoms.reduce((s, e) => s + e.severity, 0) / total).toFixed(1)
        : "0.0";
    const takenCount = medications.filter((m) => m.taken === true).length;
    const adherence =
      medications.length > 0
        ? Math.round((takenCount / medications.length) * 100)
        : 0;
    const dates = symptoms.map((s) => s.date).sort();
    const weeksCovered =
      dates.length >= 2
        ? Math.ceil(
            (new Date(dates[dates.length - 1]).getTime() -
              new Date(dates[0]).getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          )
        : 1;
    return { total, voiceNotes, avgSev, adherence, weeksCovered };
  }, [symptoms, medications]);

  const items = [
    {
      label: "Symptom entries",
      value: String(stats.total),
      sub: `over ${stats.weeksCovered} weeks`,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      label: "Avg severity",
      value: `${stats.avgSev}/10`,
      sub: "across all entries",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: "Adherence today",
      value: `${stats.adherence}%`,
      sub: "medications taken",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Voice notes",
      value: String(stats.voiceNotes),
      sub: "recordings attached",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="font-display text-base font-semibold text-zentic-purple-dark mb-4">
        Key Metrics
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ backgroundColor: "#F3F1F8" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#EDEAF6", color: "#9485D4" }}
            >
              {item.icon}
            </div>
            <div className="min-w-0">
              <div className="font-display text-xl font-semibold text-zentic-purple leading-tight">
                {item.value}
              </div>
              <div className="font-sans text-xs font-semibold text-gray-600">
                {item.label}
              </div>
              <div className="font-sans text-[10px] text-gray-400">
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
