"use client";

import { useZenticStore } from "@/lib/store";

function formatDate(iso: string): string {
  const [, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} 2026`;
}

export default function AISummaryCard() {
  const gpSummary = useZenticStore((s) => s.gpSummary);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Card header */}
      <div
        className="flex items-start justify-between gap-3 px-4 md:px-6 py-4 border-b border-gray-50 flex-wrap"
        style={{ backgroundColor: "#FDFCFF" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#9485D4" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </div>
          <span className="font-display text-base font-semibold text-zentic-purple-dark">
            AI Health Snapshot
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="rounded-md text-[10px] font-semibold px-2.5 py-1"
            style={{ backgroundColor: "#EDEAF6", color: "#9485D4" }}
          >
            Auto-generated
          </span>
          <span className="font-sans text-xs text-gray-400">
            Generated {formatDate(gpSummary.generatedDate)}
          </span>
        </div>
      </div>

      <div className="px-4 md:px-6 py-5">
        {/* Summary paragraph */}
        <p className="font-sans text-sm text-gray-700 leading-relaxed">
          {gpSummary.summaryText}
        </p>

        {/* Flagged concerns */}
        <div className="mt-5 pt-5 border-t border-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-gray-400">
              Flagged Concerns
            </h4>
          </div>
          <ul className="space-y-2.5">
            {gpSummary.recentConcerns.map((concern, i) => (
              <li key={i} className="flex gap-3 items-start">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-sans text-[10px] font-bold"
                  style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}
                >
                  {i + 1}
                </div>
                <p className="font-sans text-sm text-gray-700 leading-snug">
                  {concern}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <p className="font-sans text-[10px] text-gray-400 mt-5 pt-4 border-t border-gray-50">
          AI-generated for clinical context only. Apply clinical judgement before
          acting on this summary.
        </p>
      </div>
    </div>
  );
}
