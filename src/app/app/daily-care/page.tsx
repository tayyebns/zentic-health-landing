"use client";

import { useZenticStore } from "@/lib/store";

// Temporary debug view — replaced by real Daily Care UI in Phase 3.
export default function DailyCare() {
  const symptoms = useZenticStore((s) => s.symptoms);

  return (
    <div className="p-4">
      <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-widest text-zentic-purple">
        [Debug] Symptom log — {symptoms.length} entries
      </p>
      <ul className="space-y-1">
        {symptoms.map((s) => (
          <li key={s.id} className="font-sans text-sm text-gray-700">
            {s.date} — {s.symptom} — {s.severity}/10
          </li>
        ))}
      </ul>
    </div>
  );
}
