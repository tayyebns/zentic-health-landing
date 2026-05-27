import type {
  Patient,
  SymptomEntry,
  Medication,
  GpSummary,
  ChatMessage,
  TranscriptLine,
} from './types';

export const seedPatient: Patient = {
  id: 'patient-001',
  name: 'Maria',
  age: 27,
  condition: 'Type 2 Diabetes & Hypertension',
  primaryLanguage: 'en',
};

// ~4 weeks of history ending 27 May 2026.
// Severity arc: high flare in early May, gradually improving through mid-May,
// stabilising low by late May — creates a clear downward trend line on a chart.
export const seedSymptoms: SymptomEntry[] = [
  {
    id: 'sym-001',
    symptom: 'Headache',
    severity: 8,
    description: 'Throbbing pain across the forehead, worse in the afternoon.',
    date: '2026-04-29',
    notes: 'Started after a long shift at work.',
    hasVoiceNote: false,
  },
  {
    id: 'sym-002',
    symptom: 'Tiredness',
    severity: 7,
    description: 'Heavy fatigue even after 8 hours of sleep.',
    date: '2026-04-30',
    hasVoiceNote: true,
  },
  {
    id: 'sym-003',
    symptom: 'Headache',
    severity: 9,
    description: 'Severe pulsating headache, made worse by light. Took paracetamol.',
    date: '2026-05-02',
    notes: 'BP was 148/92 when checked at pharmacy.',
    hasVoiceNote: false,
  },
  {
    id: 'sym-004',
    symptom: 'Nausea',
    severity: 6,
    description: 'Felt queasy throughout the morning, could not finish breakfast.',
    date: '2026-05-04',
    hasVoiceNote: false,
  },
  {
    id: 'sym-005',
    symptom: 'Back Pain',
    severity: 7,
    description: 'Dull ache in the lower back, uncomfortable when sitting for long periods.',
    date: '2026-05-06',
    notes: 'Worse after standing at the kitchen counter.',
    hasVoiceNote: false,
  },
  {
    id: 'sym-006',
    symptom: 'Headache',
    severity: 7,
    description: 'Moderate headache, less intense than earlier in the week.',
    date: '2026-05-08',
    hasVoiceNote: false,
  },
  {
    id: 'sym-007',
    symptom: 'Tiredness',
    severity: 6,
    description: 'Still fatigued but managed a short walk. Energy improved slightly.',
    date: '2026-05-10',
    hasVoiceNote: false,
  },
  {
    id: 'sym-008',
    symptom: 'Nausea',
    severity: 4,
    description: 'Mild nausea after taking Metformin with a light breakfast.',
    date: '2026-05-13',
    notes: 'May be linked to taking medication on an empty stomach.',
    hasVoiceNote: true,
  },
  {
    id: 'sym-009',
    symptom: 'Headache',
    severity: 5,
    description: 'Mild tension headache in the evening, resolved after rest.',
    date: '2026-05-15',
    hasVoiceNote: false,
  },
  {
    id: 'sym-010',
    symptom: 'Back Pain',
    severity: 4,
    description: 'Lower back stiffness in the morning, eased after gentle stretching.',
    date: '2026-05-17',
    hasVoiceNote: false,
  },
  {
    id: 'sym-011',
    symptom: 'Tiredness',
    severity: 4,
    description: 'Mild fatigue by mid-afternoon. Able to complete usual daily tasks.',
    date: '2026-05-20',
    hasVoiceNote: false,
  },
  {
    id: 'sym-012',
    symptom: 'Headache',
    severity: 3,
    description: 'Very mild headache, barely noticeable. Resolved without medication.',
    date: '2026-05-23',
    hasVoiceNote: false,
  },
  {
    id: 'sym-013',
    symptom: 'Tiredness',
    severity: 2,
    description: 'Slight tiredness in the afternoon, feeling much better overall.',
    date: '2026-05-26',
    notes: 'Good sleep last two nights.',
    hasVoiceNote: false,
  },
];

// 7 medications: 3 taken (true), 1 skipped (false), 3 not yet actioned (null)
// → "roughly 3 of 7 actioned today"
export const seedMedications: Medication[] = [
  {
    id: 'med-001',
    name: 'Metformin',
    dose: '500mg',
    timeOfDay: 'morning',
    taken: true,
  },
  {
    id: 'med-002',
    name: 'Amlodipine',
    dose: '5mg',
    timeOfDay: 'morning',
    taken: true,
  },
  {
    id: 'med-003',
    name: 'Omeprazole',
    dose: '20mg',
    timeOfDay: 'morning',
    taken: false,
  },
  {
    id: 'med-004',
    name: 'Metformin',
    dose: '500mg',
    timeOfDay: 'afternoon',
    taken: true,
  },
  {
    id: 'med-005',
    name: 'Ramipril',
    dose: '2.5mg',
    timeOfDay: 'afternoon',
    taken: null,
  },
  {
    id: 'med-006',
    name: 'Atorvastatin',
    dose: '20mg',
    timeOfDay: 'evening',
    taken: null,
  },
  {
    id: 'med-007',
    name: 'Vitamin D3',
    dose: '1000 IU',
    timeOfDay: 'evening',
    taken: null,
  },
];

export const seedGpSummary: GpSummary = {
  id: 'gp-sum-001',
  generatedDate: '2026-05-27',
  summaryText:
    'Maria has reported a consistent pattern of symptoms over the past four weeks, ' +
    'predominantly headaches, fatigue, lower back pain, and occasional nausea. ' +
    'Symptom severity was at its highest in early May — headache severity reaching 9/10 ' +
    'on 2 May, coinciding with an elevated blood pressure reading of 148/92 noted at a ' +
    'community pharmacy. Since then, there has been a clear and sustained improvement: ' +
    'headache severity has reduced to 3/10 by 23 May, and fatigue scores have fallen from ' +
    '7/10 to 2/10 by 26 May. Medication adherence has been partial today, with morning ' +
    'medications largely taken but afternoon and evening doses not yet actioned. The nausea ' +
    'reported on 13 May appears to be associated with Metformin taken on an empty stomach. ' +
    'Overall, the trajectory is positive, though blood pressure monitoring and consistent ' +
    'medication adherence remain the primary focus areas ahead of the next review.',
  recentConcerns: [
    'Elevated BP reading (148/92) on 2 May — monitor trend and confirm current readings.',
    'Omeprazole skipped this morning — discuss gastric protection given Metformin use.',
    'Metformin-related nausea flagged on 13 May — consider advising administration with a full meal.',
  ],
};

export const seedChatMessages: ChatMessage[] = [
  {
    id: 'chat-001',
    role: 'user',
    text: 'I have had a bad headache again today. Is there anything I can do?',
  },
  {
    id: 'chat-002',
    role: 'assistant',
    text:
      'I am sorry to hear that. Staying well-hydrated, resting in a quiet and dimly lit room, ' +
      'and taking any paracetamol your GP has approved can help with tension headaches. ' +
      'I have added this to your symptom log so your GP can see the pattern. ' +
      'If the headache is severe, sudden, or feels different from usual, please seek medical attention straight away.',
  },
  {
    id: 'chat-003',
    role: 'user',
    text: 'I forgot to take my Omeprazole this morning. Should I take it now?',
  },
  {
    id: 'chat-004',
    role: 'assistant',
    text:
      'It is best to check with your GP or pharmacist about missed doses, as guidance can vary ' +
      'depending on your full medication plan. As a general note, if it is still the same day ' +
      'and close to your usual time, you may be able to take it — but do not double up. ' +
      'I have logged this as skipped so your GP is aware at your next review.',
  },
];

export const seedAppointmentTranscript: TranscriptLine[] = [
  {
    speaker: 'Doctor',
    text: 'Good morning, Maria. How have you been feeling since our last appointment?',
  },
  {
    speaker: 'You',
    text: 'Better, thank you. The headaches have definitely been easing off over the past couple of weeks. They were quite bad at the start of May.',
  },
  {
    speaker: 'Doctor',
    text: 'Good to hear. I can see from your health summary that your symptom severity has been coming down steadily. Your blood pressure reading in early May was 148 over 92 — have you been monitoring it at home?',
  },
  {
    speaker: 'You',
    text: 'I have been trying to, yes. It does seem to be coming down a little.',
  },
  {
    speaker: 'Doctor',
    text: 'That is encouraging. How are you getting on with the Amlodipine?',
  },
  {
    speaker: 'You',
    text: 'I take it every morning with the Metformin. I sometimes forget the evening tablets though — the Atorvastatin.',
  },
  {
    speaker: 'Doctor',
    text: 'The Atorvastatin works best taken in the evening, so do try to keep that consistent. I also noticed you flagged some nausea in your symptom log. Is that still happening?',
  },
  {
    speaker: 'You',
    text: 'It was mainly when I took the Metformin without eating first. I have been having breakfast before taking it and that seems to have helped a lot.',
  },
  {
    speaker: 'Doctor',
    text: 'That is exactly right — food makes a real difference with Metformin. Everything looks positive overall. Let us review again in six weeks and we will check your blood pressure and HbA1c at that point.',
  },
  {
    speaker: 'You',
    text: 'Thank you, doctor. That is really reassuring.',
  },
];
