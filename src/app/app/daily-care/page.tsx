"use client";

import { useState } from "react";
import StatsCards from "@/components/daily-care/StatsCards";
import SeverityChart from "@/components/daily-care/SeverityChart";
import LogForm from "@/components/daily-care/LogForm";
import RecentEntries from "@/components/daily-care/RecentEntries";

export default function DailyCare() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="pb-6">
      {/* Screen header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="font-display text-xl font-semibold text-zentic-purple-dark">
          Daily Care
        </h1>
        <p className="font-sans text-xs text-gray-400 mt-0.5">
          Track how you feel, every day
        </p>
      </div>

      <StatsCards />
      <SeverityChart />

      {/* Record button — expands to inline form */}
      {showForm ? (
        <LogForm onClose={() => setShowForm(false)} />
      ) : (
        <div className="px-4 mt-3">
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-3 rounded-2xl font-sans font-semibold text-sm text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: "#9485D4" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Record a symptom
          </button>
        </div>
      )}

      <RecentEntries />
    </div>
  );
}
