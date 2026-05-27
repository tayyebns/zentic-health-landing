import { create } from 'zustand';
import type {
  Patient,
  SymptomEntry,
  Medication,
  GpSummary,
  ChatMessage,
  Language,
  MedicationTaken,
} from './types';
import {
  seedPatient,
  seedSymptoms,
  seedMedications,
  seedGpSummary,
  seedChatMessages,
} from './seed';

interface ZenticStore {
  // ── State ────────────────────────────────────────────────────────────────
  patient: Patient;
  symptoms: SymptomEntry[];
  medications: Medication[];
  gpSummary: GpSummary;
  chatMessages: ChatMessage[];
  selectedLanguage: Language;

  // ── Actions ──────────────────────────────────────────────────────────────
  addSymptom: (entry: SymptomEntry) => void;
  deleteSymptom: (id: string) => void;
  setMedicationStatus: (id: string, taken: MedicationTaken) => void;
  setLanguage: (lang: Language) => void;
  addChatMessage: (message: ChatMessage) => void;
}

export const useZenticStore = create<ZenticStore>()((set) => ({
  // ── Initial state hydrated from seed ─────────────────────────────────────
  patient: seedPatient,
  symptoms: seedSymptoms,
  medications: seedMedications,
  gpSummary: seedGpSummary,
  chatMessages: seedChatMessages,
  selectedLanguage: seedPatient.primaryLanguage,

  // ── Action implementations ────────────────────────────────────────────────
  addSymptom: (entry) =>
    set((state) => ({ symptoms: [...state.symptoms, entry] })),

  deleteSymptom: (id) =>
    set((state) => ({ symptoms: state.symptoms.filter((s) => s.id !== id) })),

  setMedicationStatus: (id, taken) =>
    set((state) => ({
      medications: state.medications.map((m) =>
        m.id === id ? { ...m, taken } : m,
      ),
    })),

  setLanguage: (lang) => set({ selectedLanguage: lang }),

  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
}));
