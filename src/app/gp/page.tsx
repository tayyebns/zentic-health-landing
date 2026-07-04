"use client";

import { motion } from "framer-motion";
import Wordmark from "@/components/Wordmark";
import PatientHeader from "@/components/gp/PatientHeader";
import AISummaryCard from "@/components/gp/AISummaryCard";
import QuickStats from "@/components/gp/QuickStats";
import SymptomTrendChart from "@/components/gp/SymptomTrendChart";
import SymptomFrequencyChart from "@/components/gp/SymptomFrequencyChart";
import MedicationAdherence from "@/components/gp/MedicationAdherence";
import HealthEventTimeline from "@/components/gp/HealthEventTimeline";

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function GPDashboard() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F3F1F8" }}>
      {/* Sticky nav bar */}
      <nav
        className="bg-white border-b border-gray-100 px-4 md:px-8 py-3.5 flex items-center justify-between"
        style={{ position: "sticky", top: 0, zIndex: 40 }}
      >
        <div className="flex items-center gap-3">
          <Wordmark size="base" />
          <span className="text-gray-300 text-lg">|</span>
          <span className="font-sans text-sm text-gray-500 font-medium">
            GP Dashboard
          </span>
        </div>
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

      {/* Patient header */}
      <FadeUp>
        <PatientHeader />
      </FadeUp>

      {/* Main dashboard grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-7 space-y-4 md:space-y-6">
        {/* Row 1: AI Summary (2/3) + Key Metrics (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
          <FadeUp delay={0.05} className="md:col-span-2">
            <AISummaryCard />
          </FadeUp>
          <FadeUp delay={0.1}>
            <QuickStats />
          </FadeUp>
        </div>

        {/* Row 2: Symptom Trend (2/3) + Frequency (1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
          <FadeUp delay={0.15} className="md:col-span-2">
            <SymptomTrendChart />
          </FadeUp>
          <FadeUp delay={0.2}>
            <SymptomFrequencyChart />
          </FadeUp>
        </div>

        {/* Row 3: Adherence (1/2) + Timeline (1/2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          <FadeUp delay={0.25}>
            <MedicationAdherence />
          </FadeUp>
          <FadeUp delay={0.3}>
            <HealthEventTimeline />
          </FadeUp>
        </div>
      </main>
    </div>
  );
}
