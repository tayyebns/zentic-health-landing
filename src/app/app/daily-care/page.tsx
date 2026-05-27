"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatsCards from "@/components/daily-care/StatsCards";
import SeverityChart from "@/components/daily-care/SeverityChart";
import LogForm from "@/components/daily-care/LogForm";
import RecentEntries from "@/components/daily-care/RecentEntries";
import { useTranslation } from "@/lib/useTranslation";

export default function DailyCare() {
  const [showForm, setShowForm] = useState(false);
  const t = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="pb-6"
    >
      <div className="px-4 pt-4 pb-2">
        <h1 className="font-display text-xl font-semibold text-zentic-purple-dark">
          {t.dailyCare.title}
        </h1>
        <p className="font-sans text-xs text-gray-400 mt-0.5">
          {t.dailyCare.subtitle}
        </p>
      </div>

      <StatsCards />
      <SeverityChart />

      <div className="px-4 mt-3">
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{ overflow: "hidden" }}
            >
              <LogForm onClose={() => setShowForm(false)} />
            </motion.div>
          ) : (
            <motion.button
              key="btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(true)}
              className="w-full py-3 rounded-2xl font-sans font-semibold text-sm text-white flex items-center justify-center gap-2"
              style={{ backgroundColor: "#9485D4" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              {t.dailyCare.recordSymptom}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <RecentEntries />
    </motion.div>
  );
}
