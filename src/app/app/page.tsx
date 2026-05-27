"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useZenticStore } from "@/lib/store";
import { useTranslation } from "@/lib/useTranslation";

export default function PatientHome() {
  const patient = useZenticStore((s) => s.patient);
  const symptoms = useZenticStore((s) => s.symptoms);
  const medications = useZenticStore((s) => s.medications);
  const t = useTranslation();

  const takenCount = medications.filter((m) => m.taken === true).length;
  const adherence = medications.length > 0
    ? Math.round((takenCount / medications.length) * 100)
    : 0;
  const recentSymptom = [...symptoms].sort((a, b) => b.date.localeCompare(a.date))[0];

  const shortcuts = [
    { label: t.nav.dailyCare, href: "/app/daily-care", color: "#9485D4",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> },
    { label: t.nav.reminders, href: "/app/reminders", color: "#10B981",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
    { label: t.nav.gpBridge, href: "/app/gp-bridge", color: "#F59E0B",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg> },
    { label: t.nav.capture, href: "/app/capture", color: "#6366F1",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /></svg> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="px-4 pt-5 pb-6 space-y-4"
    >
      {/* Welcome header */}
      <div>
        <h1 className="font-display text-xl font-semibold text-zentic-purple-dark">
          {t.home.title}
        </h1>
        <p className="font-sans text-xs text-gray-400 mt-0.5">{t.home.subtitle}</p>
      </div>

      {/* Today summary card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display text-base font-semibold text-white"
            style={{ backgroundColor: "#9485D4" }}
          >
            {patient.name[0]}
          </div>
          <div>
            <p className="font-sans text-sm font-semibold text-zentic-purple-dark">{patient.name}</p>
            <p className="font-sans text-[10px] text-gray-400">{patient.condition}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-3" style={{ backgroundColor: "#F3F1F8" }}>
            <p className="font-display text-lg font-semibold text-zentic-purple">{adherence}%</p>
            <p className="font-sans text-[10px] text-gray-500">{t.reminders.taken} today</p>
          </div>
          <div className="rounded-xl p-3" style={{ backgroundColor: "#F3F1F8" }}>
            <p className="font-display text-lg font-semibold text-zentic-purple">{symptoms.length}</p>
            <p className="font-sans text-[10px] text-gray-500">{t.dailyCare.totalLogged}</p>
          </div>
        </div>
        {recentSymptom && (
          <div className="mt-3 pt-3 border-t border-gray-50">
            <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest mb-1">Most recent</p>
            <p className="font-sans text-xs text-gray-700">
              <span className="font-semibold">{recentSymptom.symptom}</span>
              {" "}— {recentSymptom.severity}/10
            </p>
          </div>
        )}
      </div>

      {/* Quick-access grid */}
      <div className="grid grid-cols-2 gap-2">
        {shortcuts.map((s, i) => (
          <motion.div
            key={s.href}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 + 0.1 }}
          >
            <Link
              href={s.href}
              className="flex items-center gap-2.5 bg-white rounded-2xl p-3.5 shadow-sm"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${s.color}18`, color: s.color }}
              >
                {s.icon}
              </div>
              <span className="font-sans text-xs font-semibold text-zentic-purple-dark leading-tight">
                {s.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
