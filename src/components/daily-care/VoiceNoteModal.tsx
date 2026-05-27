"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VoiceNoteModalProps {
  onStop: (durationSeconds: number) => void;
  onCancel: () => void;
}

const BAR_COUNT = 28;
// Pre-computed base heights so they don't change on re-render
const BASE_HEIGHTS = Array.from(
  { length: BAR_COUNT },
  (_, i) => 10 + Math.abs(Math.sin(i * 0.45)) * 22
);

export default function VoiceNoteModal({ onStop, onCancel }: VoiceNoteModalProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    // Full-viewport backdrop — dark overlay outside phone frame
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onCancel}
        aria-hidden
      />

      {/* Phone-frame-shaped recording screen */}
      <div
        className="relative z-10 flex flex-col items-center justify-center overflow-hidden"
        style={{
          width: 390,
          maxWidth: "100vw",
          height: 844,
          maxHeight: "100vh",
          backgroundColor: "#130E1F",
          borderRadius: 28,
        }}
      >
        {/* Recording indicator */}
        <div className="flex items-center gap-2.5 mb-10">
          <motion.div
            animate={{ opacity: [1, 0.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-3 h-3 rounded-full bg-red-500"
          />
          <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-red-400">
            Recording
          </span>
        </div>

        {/* Timer */}
        <div className="font-display text-6xl font-semibold text-white tabular-nums mb-12">
          {mm}:{ss}
        </div>

        {/* Animated waveform */}
        <div className="flex items-center justify-center gap-1 h-24 mb-14 px-8 w-full">
          {BASE_HEIGHTS.map((base, i) => (
            <motion.div
              key={i}
              className="flex-1 max-w-[6px] rounded-full"
              style={{ backgroundColor: "#9485D4" }}
              animate={{
                height: [base, base * 1.8 + Math.abs(Math.sin(i * 0.3)) * 12, base],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 0.55 + (i % 5) * 0.12,
                repeat: Infinity,
                delay: i * 0.045,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Hint text */}
        <p className="font-sans text-xs text-white/40 mb-8">
          Tap Stop when you are done
        </p>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="px-8 py-3 rounded-full font-sans text-sm font-semibold text-white/60"
            style={{ border: "1.5px solid rgba(255,255,255,0.15)" }}
          >
            Cancel
          </button>
          <button
            onClick={() => onStop(seconds)}
            className="px-8 py-3 rounded-full font-sans text-sm font-semibold text-white"
            style={{ backgroundColor: "#9485D4" }}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
