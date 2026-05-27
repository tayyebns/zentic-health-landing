"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useZenticStore } from "@/lib/store";
import { useTranslation } from "@/lib/useTranslation";

const ACCESS_CODE = "ZEN-4821";

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#EDEAF6" }}
      >
        <span style={{ color: "#9485D4" }}>{icon}</span>
      </div>
      <span className="font-sans text-xs text-gray-600 flex-1">{label}</span>
      <span className="font-sans text-xs font-semibold text-zentic-purple-dark">{value}</span>
    </div>
  );
}

export default function GPBridge() {
  const symptoms = useZenticStore((s) => s.symptoms);
  const medications = useZenticStore((s) => s.medications);
  const t = useTranslation();

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const summary = useMemo(() => {
    const voiceNotes = symptoms.filter((s) => s.hasVoiceNote).length;
    const takenCount = medications.filter((m) => m.taken === true).length;
    const adherencePct =
      medications.length > 0 ? Math.round((takenCount / medications.length) * 100) : 0;
    const dates = symptoms.map((s) => s.date).sort();
    const weeksCovered =
      dates.length >= 2
        ? Math.ceil(
            (new Date(dates[dates.length - 1]).getTime() - new Date(dates[0]).getTime()) /
              (7 * 24 * 60 * 60 * 1000)
          )
        : 1;
    return { voiceNotes, adherencePct, weeksCovered, total: symptoms.length };
  }, [symptoms, medications]);

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCESS_CODE).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="pb-6"
    >
      <div className="px-4 pt-4 pb-3">
        <h1 className="font-display text-xl font-semibold text-zentic-purple-dark">
          {t.gpBridge.title}
        </h1>
        <p className="font-sans text-xs text-gray-400 mt-0.5">{t.gpBridge.subtitle}</p>
      </div>

      {/* Explanation card */}
      <div className="mx-4 mb-4 bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9485D4" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold text-zentic-purple-dark mb-1">
              {t.gpBridge.whatSharingDoes}
            </p>
            <p className="font-sans text-[11px] text-gray-600 leading-relaxed">
              {t.gpBridge.sharingExplanation}
            </p>
          </div>
        </div>
      </div>

      {/* What GP will see */}
      <div className="mx-4 mb-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-50">
          <p className="font-display text-sm font-semibold text-zentic-purple-dark">
            {t.gpBridge.whatGPWillSee}
          </p>
        </div>
        <div className="px-4">
          <SummaryRow
            icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>}
            label={t.gpBridge.symptomEntries}
            value={t.gpBridge.entriesOverWeeks(summary.total, summary.weeksCovered)}
          />
          <SummaryRow
            icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            label={t.gpBridge.medicationAdherence}
            value={`${summary.adherencePct}%`}
          />
          <SummaryRow
            icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /></svg>}
            label={t.gpBridge.voiceNotes}
            value={t.gpBridge.voiceNoteCount(summary.voiceNotes)}
          />
          <SummaryRow
            icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
            label={t.gpBridge.aiSummary}
            value={t.gpBridge.included}
          />
        </div>
      </div>

      {/* Access code */}
      <div className="mx-4 mb-4 bg-white rounded-2xl p-4 shadow-sm">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
          {t.gpBridge.yourAccessCode}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display text-3xl font-semibold tracking-[0.12em] text-zentic-purple-dark">
            {ACCESS_CODE}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={{
              backgroundColor: copied ? "#DCFCE7" : "#EDEAF6",
              color: copied ? "#15803D" : "#9485D4",
            }}
          >
            {copied ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {t.gpBridge.copied}
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {t.gpBridge.copyCode}
              </>
            )}
          </button>
        </div>
        <p className="font-sans text-[10px] text-gray-400 mt-2">{t.gpBridge.giveCodeToGP}</p>
      </div>

      {/* Share button / confirmation */}
      <div className="mx-4">
        <AnimatePresence mode="wait">
          {shared ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl p-4 shadow-sm text-center"
              style={{ backgroundColor: "#DCFCE7" }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p className="font-sans text-sm font-semibold text-green-700">
                  {t.gpBridge.sharedWithGP}
                </p>
              </div>
              <p className="font-sans text-xs text-green-600">
                {t.gpBridge.sharedConfirmation}{" "}
                <strong>{ACCESS_CODE}</strong>.
              </p>
              <button
                onClick={() => setShared(false)}
                className="mt-3 font-sans text-[11px] text-green-700 underline underline-offset-2"
              >
                {t.gpBridge.revokeAccess}
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="share-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShared(true)}
              className="w-full py-3.5 rounded-2xl font-sans font-semibold text-sm text-white shadow-sm"
              style={{ backgroundColor: "#9485D4" }}
            >
              {t.gpBridge.shareWithGP}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
