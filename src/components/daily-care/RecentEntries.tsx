"use client";

import { useZenticStore } from "@/lib/store";
import type { SymptomEntry } from "@/lib/types";

function formatDate(dateStr: string): string {
  const [, m, d] = dateStr.split("-");
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  return `${months[parseInt(m) - 1]} ${parseInt(d)}, 2026`;
}

function getSeverityStyle(severity: number): {
  bg: string;
  text: string;
  label: string;
} {
  if (severity <= 2) return { bg: "#DCFCE7", text: "#15803D", label: "Very mild" };
  if (severity <= 4) return { bg: "#FEF9C3", text: "#92400E", label: "Mild" };
  if (severity <= 6) return { bg: "#FEF3C7", text: "#B45309", label: "Moderate" };
  if (severity <= 8) return { bg: "#FFEDD5", text: "#C2410C", label: "Quite bad" };
  return { bg: "#FEE2E2", text: "#B91C1C", label: "Severe" };
}

function EntryCard({
  entry,
  onDelete,
}: {
  entry: SymptomEntry;
  onDelete: () => void;
}) {
  const { bg, text, label } = getSeverityStyle(entry.severity);

  return (
    <div className="bg-white rounded-2xl p-3.5 shadow-sm">
      <div className="flex items-start gap-2">
        {/* Left content */}
        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="font-sans text-sm font-semibold text-zentic-purple-dark">
              {entry.symptom}
            </span>

            {/* Severity chip */}
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold flex-shrink-0"
              style={{ backgroundColor: bg, color: text }}
            >
              {entry.severity}/10 · {label}
            </span>

            {/* Voice note badge */}
            {entry.hasVoiceNote && (
              <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold bg-zentic-purple-light text-zentic-purple flex-shrink-0">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                </svg>
                1 voice note
              </span>
            )}
          </div>

          {/* Date */}
          <p className="font-sans text-[10px] text-gray-400 mb-1">
            {formatDate(entry.date)}
          </p>

          {/* Description */}
          {entry.description && (
            <p className="font-sans text-xs text-gray-600 leading-snug line-clamp-2">
              {entry.description}
            </p>
          )}

          {/* Notes */}
          {entry.notes && (
            <p className="font-sans text-[10px] text-gray-400 mt-1 italic line-clamp-1">
              {entry.notes}
            </p>
          )}
        </div>

        {/* Delete button */}
        <button
          onClick={onDelete}
          className="flex-shrink-0 p-1.5 text-gray-300 hover:text-red-400 transition-colors mt-0.5"
          aria-label={`Delete ${entry.symptom} entry`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="3,6 5,6 21,6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function RecentEntries() {
  const symptoms = useZenticStore((s) => s.symptoms);
  const deleteSymptom = useZenticStore((s) => s.deleteSymptom);

  const sorted = [...symptoms].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="px-4 mt-4">
      <h2 className="font-display text-sm font-semibold text-zentic-purple-dark mb-2">
        Recent Entries
      </h2>

      {sorted.length === 0 ? (
        <p className="font-sans text-sm text-gray-400 text-center py-6">
          No symptoms logged yet.
        </p>
      ) : (
        <div className="space-y-2 pb-2">
          {sorted.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onDelete={() => deleteSymptom(entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
