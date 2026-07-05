"use client";

import { useZenticStore } from "@/lib/store";

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  pl: "Polish",
  ur: "Urdu",
  pa: "Punjabi",
};

export default function PatientHeader() {
  const patient = useZenticStore((s) => s.patient);
  const symptoms = useZenticStore((s) => s.symptoms);

  const dates = symptoms.map((s) => s.date).sort();
  const earliest = dates[0] ?? "—";
  const latest = dates[dates.length - 1] ?? "—";

  function fmtDate(d: string) {
    const [, m, day] = d.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(m) - 1]} ${parseInt(day)}`;
  }

  return (
    <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 md:py-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
        {/* Avatar + info */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white font-display text-xl font-semibold"
            style={{ backgroundColor: "#9485D4" }}
          >
            {patient.name[0]}
          </div>

          <div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-zentic-purple-dark leading-tight">
              {patient.name}
            </h2>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-0.5">
              <span className="font-sans text-sm text-gray-500">
                {patient.age} yrs
              </span>
              <span className="text-gray-300">·</span>
              <span className="font-sans text-sm text-gray-600 font-medium">
                {patient.condition}
              </span>
              <span className="text-gray-300">·</span>
              <span
                className="rounded-md text-xs font-semibold px-2 py-0.5"
                style={{ backgroundColor: "#EDEAF6", color: "#9485D4" }}
              >
                {LANGUAGE_LABELS[patient.primaryLanguage] ?? patient.primaryLanguage}
              </span>
            </div>
            {dates.length > 0 && (
              <p className="font-sans text-xs text-gray-400 mt-0.5">
                Data window: {fmtDate(earliest)} – {fmtDate(latest)} · {symptoms.length} entries
              </p>
            )}
          </div>
        </div>

        {/* Access indicators */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
          >
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Access window active
          </div>
          <div
            className="font-mono text-sm font-semibold rounded-xl px-3 py-1.5"
            style={{
              backgroundColor: "#EDEAF6",
              color: "#7B6ABF",
              letterSpacing: "0.08em",
            }}
          >
            ZEN-4821
          </div>
        </div>
      </div>
    </div>
  );
}
