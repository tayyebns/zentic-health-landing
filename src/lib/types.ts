export type Language = 'en' | 'pl' | 'ur' | 'pa';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';
export type MedicationTaken = boolean | null;
export type ChatRole = 'user' | 'assistant';

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  primaryLanguage: Language;
}

export interface SymptomEntry {
  id: string;
  symptom: string;
  severity: number;
  description: string;
  date: string;
  notes?: string;
  hasVoiceNote: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dose: string;
  timeOfDay: TimeOfDay;
  taken: MedicationTaken;
}

export interface GpSummary {
  id: string;
  generatedDate: string;
  summaryText: string;
  recentConcerns: string[];
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
}

export type TranscriptSpeaker = 'Doctor' | 'You';

export interface TranscriptLine {
  speaker: TranscriptSpeaker;
  text: string;
}
