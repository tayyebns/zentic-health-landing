"use client";

import PatientHeader from "@/components/gp/PatientHeader";
import AISummaryCard from "@/components/gp/AISummaryCard";
import QuickStats from "@/components/gp/QuickStats";
import SymptomTrendChart from "@/components/gp/SymptomTrendChart";
import SymptomFrequencyChart from "@/components/gp/SymptomFrequencyChart";
import MedicationAdherence from "@/components/gp/MedicationAdherence";
import HealthEventTimeline from "@/components/gp/HealthEventTimeline";

export default function GPDashboard() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F3F1F8" }}>
      {/* Top nav bar */}
      <nav
        className="bg-white border-b border-gray-100 px-8 py-3.5 flex items-center justify-between"
        style={{ position: "sticky", top: 0, zIndex: 40 }}
      >
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#9485D4" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="font-display text-base font-semibold text-zentic-purple-dark">
            Zentic Health
          </span>
          <span className="text-gray-300 text-lg">|</span>
          <span className="font-sans text-sm text-gray-500 font-medium">
            GP Dashboard
          </span>
        </div>

        {/* Nav right: demo link to patient app */}
        <a
          href="/app"
          className="font-sans text-xs text-zentic-purple hover:underline flex items-center gap-1.5"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          View patient app
        </a>
      </nav>

      {/* Patient header row */}
      <PatientHeader />

      {/* Main dashboard grid */}
      <main className="max-w-7xl mx-auto px-8 py-7 space-y-6">
        {/* Row 1: AI Summary (2/3) + Key Metrics (1/3) */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div className="col-span-2">
            <AISummaryCard />
          </div>
          <div>
            <QuickStats />
          </div>
        </div>

        {/* Row 2: Symptom Trend (2/3) + Frequency (1/3) */}
        <div className="grid grid-cols-3 gap-6 items-start">
          <div className="col-span-2">
            <SymptomTrendChart />
          </div>
          <div>
            <SymptomFrequencyChart />
          </div>
        </div>

        {/* Row 3: Adherence (1/2) + Timeline (1/2) */}
        <div className="grid grid-cols-2 gap-6 items-start">
          <MedicationAdherence />
          <HealthEventTimeline />
        </div>
      </main>
    </div>
  );
}
