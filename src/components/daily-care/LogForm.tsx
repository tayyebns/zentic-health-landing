"use client";

import { useState } from "react";
import { useZenticStore } from "@/lib/store";
import { useTranslation } from "@/lib/useTranslation";
import VoiceNoteModal from "./VoiceNoteModal";

// English keys used for store storage (symptom names stay in English)
const SYMPTOM_KEYS = [
  "Headache", "Tiredness", "Back Pain", "Nausea", "Dizziness",
  "Chest tightness", "Joint pain", "Breathlessness", "Stomach ache",
  "Anxiety", "Palpitations", "Swollen ankles",
] as const;

const SEVERITY_COLORS = [
  "#4ADE80", "#86EFAC", "#BEF264", "#FDE68A", "#FCD34D",
  "#FDBA74", "#FB923C", "#F97316", "#EF4444", "#DC2626",
];

const WAVEFORM = [4,8,14,6,18,10,16,8,20,12,8,16,10,18,6,14,8,12,16,10,8,14,12,6,10,16,8,12,10,8];

function getSeverityLabel(n: number, t: ReturnType<typeof useTranslation>): string {
  if (n <= 2) return t.severity.veryMild;
  if (n <= 4) return t.severity.mild;
  if (n <= 6) return t.severity.moderate;
  if (n <= 8) return t.severity.quiteBad;
  return t.severity.severe;
}

function VoiceNoteCard({ duration }: { duration: number }) {
  const [playing, setPlaying] = useState(false);
  const mm = String(Math.floor(duration / 60)).padStart(2, "0");
  const ss = String(duration % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-3 bg-zentic-purple-light rounded-xl p-3">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
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
      <div className="flex flex-1 items-center gap-px h-7 overflow-hidden">
        {WAVEFORM.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-full min-w-[2px]"
            style={{
              height: `${Math.round((h / 20) * 100)}%`,
              backgroundColor: playing ? "#9485D4" : "#B8AEE0",
            }}
          />
        ))}
      </div>
      <span className="font-sans text-xs font-semibold text-zentic-purple flex-shrink-0">
        {mm}:{ss}
      </span>
    </div>
  );
}

interface LogFormProps {
  onClose: () => void;
}

export default function LogForm({ onClose }: LogFormProps) {
  const addSymptom = useZenticStore((s) => s.addSymptom);
  const t = useTranslation();

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [customSymptom, setCustomSymptom] = useState("");
  const [severity, setSeverity] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("2026-05-27");
  const [notes, setNotes] = useState("");
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  // Always store the English key in the database
  const symptomName = selectedKey ?? customSymptom;
  const canSave = symptomName.trim().length > 0 && severity !== null;

  const handlePillSelect = (key: string) => {
    setSelectedKey((prev) => (prev === key ? null : key));
    setCustomSymptom("");
  };

  const handleSave = () => {
    if (!canSave) return;
    addSymptom({
      id: `sym-${Date.now()}`,
      symptom: symptomName.trim(),
      severity: severity!,
      description: description.trim(),
      date,
      notes: notes.trim() || undefined,
      hasVoiceNote,
    });
    onClose();
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-gray-50">
          <h3 className="font-display text-sm font-semibold text-zentic-purple-dark">
            {t.dailyCare.recordSymptom}
          </h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="px-4 pb-5 pt-3 space-y-4">
          {/* Symptom pills */}
          <div>
            <Label>{t.dailyCare.symptomLabel}</Label>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {SYMPTOM_KEYS.map((key, i) => (
                <button
                  key={key}
                  onClick={() => handlePillSelect(key)}
                  className="rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: selectedKey === key ? "#9485D4" : "#F3F1F8",
                    color: selectedKey === key ? "white" : "#7B6ABF",
                  }}
                >
                  {t.symptomNames[i]}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder={t.dailyCare.customPlaceholder}
              value={customSymptom}
              onChange={(e) => {
                setCustomSymptom(e.target.value);
                if (e.target.value) setSelectedKey(null);
              }}
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-sans text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-zentic-purple"
            />
          </div>

          {/* Severity grid */}
          <div>
            <Label>{t.dailyCare.severityLabel}</Label>
            <div className="grid grid-cols-10 gap-1 mt-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
                const active = severity === n;
                return (
                  <button
                    key={n}
                    onClick={() => setSeverity(n)}
                    className="rounded-lg font-sans text-xs font-bold transition-all"
                    style={{
                      aspectRatio: "1",
                      backgroundColor: active ? SEVERITY_COLORS[n - 1] : "#F3F4F6",
                      color: active ? "white" : "#9CA3AF",
                      transform: active ? "scale(1.12)" : "scale(1)",
                      boxShadow: active ? `0 3px 8px ${SEVERITY_COLORS[n - 1]}55` : undefined,
                    }}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            {severity !== null && (
              <p
                className="mt-1.5 text-xs font-semibold"
                style={{ color: SEVERITY_COLORS[severity - 1] }}
              >
                {severity}/10 · {getSeverityLabel(severity, t)}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>{t.dailyCare.howItFeels}</Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.dailyCare.descPlaceholder}
              rows={2}
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-sans text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-zentic-purple resize-none"
            />
          </div>

          {/* Date */}
          <div>
            <Label>{t.dailyCare.dateLabel}</Label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-sans text-gray-700 focus:outline-none focus:border-zentic-purple"
            />
          </div>

          {/* Notes */}
          <div>
            <Label>
              {t.dailyCare.notesLabel}{" "}
              <span className="normal-case font-normal text-gray-400">
                {t.dailyCare.optional}
              </span>
            </Label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.dailyCare.notesPlaceholder}
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-sans text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-zentic-purple"
            />
          </div>

          {/* Voice note */}
          <div>
            {hasVoiceNote ? (
              <VoiceNoteCard duration={voiceDuration} />
            ) : (
              <button
                onClick={() => setVoiceModalOpen(true)}
                className="flex items-center gap-2 text-xs font-semibold text-zentic-purple"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                  <line x1="8" y1="22" x2="16" y2="22" />
                </svg>
                {t.dailyCare.addVoiceNote}
              </button>
            )}
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="w-full py-3 rounded-xl font-sans font-semibold text-sm transition-colors"
            style={{
              backgroundColor: canSave ? "#9485D4" : "#E5E7EB",
              color: canSave ? "white" : "#9CA3AF",
            }}
          >
            {t.dailyCare.saveEntry}
          </button>
        </div>
      </div>

      {voiceModalOpen && (
        <VoiceNoteModal
          onStop={(dur) => {
            setVoiceModalOpen(false);
            setHasVoiceNote(true);
            setVoiceDuration(dur);
          }}
          onCancel={() => setVoiceModalOpen(false)}
        />
      )}
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-gray-400">
      {children}
    </p>
  );
}
