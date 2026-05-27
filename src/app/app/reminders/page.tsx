"use client";

import { useMemo } from "react";
import { useZenticStore } from "@/lib/store";
import type { Medication, TimeOfDay } from "@/lib/types";

// ── Time-of-day config ────────────────────────────────────────────────────────

const TIME_GROUPS: Array<{ key: TimeOfDay; label: string }> = [
  { key: "morning", label: "Morning" },
  { key: "afternoon", label: "Afternoon" },
  { key: "evening", label: "Evening" },
];

function TimeIcon({ group }: { group: TimeOfDay }) {
  if (group === "morning") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  }
  if (group === "afternoon") {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// ── Medication row ────────────────────────────────────────────────────────────

function MedRow({ med }: { med: Medication }) {
  const setMedicationStatus = useZenticStore((s) => s.setMedicationStatus);

  const isTaken = med.taken === true;
  const isSkipped = med.taken === false;

  return (
    <div
      className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 transition-opacity"
      style={{ opacity: isSkipped ? 0.45 : 1 }}
    >
      {/* Status circle */}
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all"
        style={{
          borderColor: isTaken ? "#22C55E" : "#E5E7EB",
          backgroundColor: isTaken ? "#22C55E" : "transparent",
        }}
      >
        {isTaken && (
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {/* Name + dose */}
      <div className="flex-1 min-w-0">
        <p
          className="font-sans text-sm font-semibold leading-tight"
          style={{
            color: isTaken || isSkipped ? "#9CA3AF" : "#3B2D8A",
            textDecoration: isTaken ? "line-through" : "none",
          }}
        >
          {med.name}
        </p>
        <p className="font-sans text-xs text-gray-400">{med.dose}</p>
      </div>

      {/* Action buttons or status label */}
      {med.taken === null ? (
        <div className="flex gap-1.5 flex-shrink-0">
          <button
            onClick={() => setMedicationStatus(med.id, true)}
            className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
            style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
          >
            Taken
          </button>
          <button
            onClick={() => setMedicationStatus(med.id, false)}
            className="px-3 py-1 rounded-lg text-xs font-semibold transition-colors"
            style={{ backgroundColor: "#F3F4F6", color: "#9CA3AF" }}
          >
            Skip
          </button>
        </div>
      ) : isTaken ? (
        <span className="font-sans text-xs font-semibold text-green-500 flex-shrink-0">
          Taken
        </span>
      ) : (
        <span className="font-sans text-xs font-semibold text-gray-400 flex-shrink-0">
          Skipped
        </span>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Reminders() {
  const medications = useZenticStore((s) => s.medications);

  const takenCount = useMemo(
    () => medications.filter((m) => m.taken === true).length,
    [medications]
  );
  const total = medications.length;
  const pct = total > 0 ? (takenCount / total) * 100 : 0;

  const grouped = useMemo(() => {
    const map: Record<TimeOfDay, Medication[]> = {
      morning: [],
      afternoon: [],
      evening: [],
    };
    medications.forEach((m) => map[m.timeOfDay].push(m));
    return map;
  }, [medications]);

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="font-display text-xl font-semibold text-zentic-purple-dark">
          Reminders
        </h1>
        <p className="font-sans text-xs text-gray-400 mt-0.5">
          Your medication schedule for today
        </p>
      </div>

      {/* Progress card */}
      <div className="mx-4 mb-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-sm font-semibold text-zentic-purple-dark">
            {takenCount} of {total} taken today
          </span>
          <span className="font-display text-sm font-semibold text-zentic-purple">
            {Math.round(pct)}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%`, backgroundColor: "#9485D4" }}
          />
        </div>

        <p className="font-sans text-xs text-gray-400 mt-2 leading-snug">
          {takenCount === total
            ? "All medications taken — well done today."
            : `${total - takenCount} medication${total - takenCount !== 1 ? "s" : ""} still to take today.`}
        </p>
      </div>

      {/* Grouped medication sections */}
      <div className="space-y-3 px-4">
        {TIME_GROUPS.map(({ key, label }) => {
          const meds = grouped[key];
          if (!meds.length) return null;
          return (
            <div key={key} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Section header */}
              <div
                className="flex items-center gap-2 px-4 py-3 border-b border-gray-50"
                style={{ color: "#9485D4" }}
              >
                <TimeIcon group={key} />
                <span className="font-display text-sm font-semibold text-zentic-purple-dark">
                  {label}
                </span>
              </div>

              {/* Med rows */}
              <div className="px-4">
                {meds.map((med) => (
                  <MedRow key={med.id} med={med} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Supportive footer note */}
      <p className="font-sans text-[11px] text-gray-400 text-center px-8 mt-5 leading-relaxed">
        Taking your medications as prescribed helps your GP see how your
        treatment is working.
      </p>
    </div>
  );
}
