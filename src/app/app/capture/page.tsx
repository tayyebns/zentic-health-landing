"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VoiceNoteModal from "@/components/daily-care/VoiceNoteModal";
import { seedAppointmentTranscript } from "@/lib/seed";
import type { TranscriptLine } from "@/lib/types";

// ── Static waveform for the recording card ────────────────────────────────────

const WAVEFORM = [
  6,12,20,10,24,14,18,8,22,16,10,20,12,24,8,18,14,22,10,16,20,12,8,18,14,10,22,16,12,8,
];

function ConsultationCard({
  duration,
  date,
}: {
  duration: number;
  date: string;
}) {
  const [playing, setPlaying] = useState(false);
  const mm = String(Math.floor(duration / 60)).padStart(2, "0");
  const ss = String(duration % 60).padStart(2, "0");

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#EDEAF6" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9485D4" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="8" y1="22" x2="16" y2="22" />
          </svg>
        </div>
        <div>
          <p className="font-sans text-xs font-semibold text-zentic-purple-dark">
            Consultation recording
          </p>
          <p className="font-sans text-[10px] text-gray-400">{date}</p>
        </div>
      </div>

      {/* Waveform + player */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#9485D4" }}
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <polygon points="6,3 20,12 6,21" />
            </svg>
          )}
        </button>

        {/* Static waveform */}
        <div className="flex flex-1 items-center gap-px h-8 overflow-hidden">
          {WAVEFORM.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-full min-w-[2px]"
              style={{
                height: `${Math.round((h / 24) * 100)}%`,
                backgroundColor: playing ? "#9485D4" : "#C4BBE8",
              }}
            />
          ))}
        </div>

        <span className="font-sans text-xs font-semibold text-zentic-purple flex-shrink-0">
          {mm}:{ss}
        </span>
      </div>

      {/* Cosmetic progress bar */}
      <div className="h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{ width: playing ? "35%" : "0%", backgroundColor: "#9485D4", transition: "width 0.3s" }}
        />
      </div>
    </div>
  );
}

// ── Transcript block ──────────────────────────────────────────────────────────

function TranscriptBlock({ lines }: { lines: TranscriptLine[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-50">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9485D4" strokeWidth="2" strokeLinecap="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="font-display text-sm font-semibold text-zentic-purple-dark">
          AI Transcription
        </span>
        <span className="ml-auto rounded-full bg-zentic-purple-light text-zentic-purple text-[10px] font-semibold px-2 py-0.5">
          Auto-generated
        </span>
      </div>

      {/* Transcript lines */}
      <div className="px-4 py-3 space-y-3">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2.5">
            <span
              className="font-sans text-[10px] font-semibold flex-shrink-0 pt-0.5 w-12 text-right"
              style={{ color: line.speaker === "Doctor" ? "#9485D4" : "#7B6ABF" }}
            >
              {line.speaker}
            </span>
            <p className="font-sans text-xs text-gray-700 leading-relaxed flex-1">
              {line.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AppointmentCapture() {
  const [modalOpen, setModalOpen] = useState(false);
  const [recording, setRecording] = useState<{
    duration: number;
    date: string;
  } | null>(null);

  const handleStop = (duration: number) => {
    setModalOpen(false);
    setRecording({ duration, date: "GP appointment — 12 May 2026" });
  };

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="font-display text-xl font-semibold text-zentic-purple-dark">
          Appointment Capture
        </h1>
        <p className="font-sans text-xs text-gray-400 mt-0.5">
          Record your consultation for your own records
        </p>
      </div>

      {/* BMA guidance notice */}
      <div
        className="mx-4 mb-5 rounded-2xl p-4 shadow-sm"
        style={{ backgroundColor: "#EDEAF6" }}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9485D4" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <p className="font-sans text-xs font-semibold text-zentic-purple-dark mb-1">
              Recording your appointment is encouraged
            </p>
            <p className="font-sans text-[11px] text-gray-600 leading-relaxed">
              The BMA supports patients recording consultations for personal use.
              It helps you remember what was discussed and share it with carers
              or family. Your recording is stored only on this device.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {recording ? (
          /* ── Post-recording: card + transcript ── */
          <motion.div
            key="recorded"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 space-y-3"
          >
            <ConsultationCard
              duration={recording.duration}
              date={recording.date}
            />

            <TranscriptBlock lines={seedAppointmentTranscript} />

            {/* Re-record option */}
            <button
              onClick={() => setRecording(null)}
              className="w-full py-3 rounded-2xl font-sans text-sm font-semibold text-zentic-purple"
              style={{ border: "1.5px solid #9485D4" }}
            >
              Record a new consultation
            </button>
          </motion.div>
        ) : (
          /* ── Idle: big mic button ── */
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center px-4 pt-4"
          >
            {/* Pulsing ring + mic button */}
            <div className="relative flex items-center justify-center mb-6">
              {/* Outer pulse ring */}
              <motion.div
                className="absolute rounded-full"
                style={{ width: 110, height: 110, backgroundColor: "#EDEAF6" }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Inner ring */}
              <div
                className="absolute rounded-full"
                style={{ width: 88, height: 88, backgroundColor: "#DDD7F0" }}
              />
              {/* Mic button */}
              <button
                onClick={() => setModalOpen(true)}
                className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "#9485D4" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                  <line x1="8" y1="22" x2="16" y2="22" />
                </svg>
              </button>
            </div>

            <p className="font-display text-base font-semibold text-zentic-purple-dark mb-1">
              Tap to start recording
            </p>
            <p className="font-sans text-xs text-gray-400 text-center max-w-[240px] leading-relaxed">
              Your recording will be transcribed automatically when you stop.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice recording modal */}
      {modalOpen && (
        <VoiceNoteModal onStop={handleStop} onCancel={() => setModalOpen(false)} />
      )}
    </div>
  );
}
