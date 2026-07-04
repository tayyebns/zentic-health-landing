export const SYMPTOM_COLORS: Record<string, string> = {
  Migraine: "#9485D4",
  Nausea: "#C99A3E",
};

export const PATIENT = {
  initial: "O",
  name: "R. Okafor",
  age: 34,
  condition: "Migraine, recurring",
  language: "English",
  dataWindow: "5 Jun – 2 Jul 2026",
  accessCode: "ZH-4Q7T-K2M9-XR3B",
};

export const KEY_METRICS = [
  { label: "Symptom entries", value: "13", sub: "over 4 weeks" },
  { label: "Average severity", value: "5.8/10", sub: "across all entries" },
  { label: "Medication adherence", value: "82%", sub: "over 4 weeks" },
];

export const TREND_DATA = [
  { date: "5 Jun", Migraine: 4, Nausea: null },
  { date: "12 Jun", Migraine: 6, Nausea: null },
  { date: "18 Jun", Migraine: 5, Nausea: 3 },
  { date: "24 Jun", Migraine: 7, Nausea: null },
  { date: "28 Jun", Migraine: 6, Nausea: null },
  { date: "2 Jul", Migraine: 8, Nausea: 4 },
];

export const FREQUENCY_DATA = [
  { symptom: "Migraine", count: 9 },
  { symptom: "Nausea", count: 4 },
];

export const MEDICATIONS = [
  { name: "Sumatriptan 50mg", status: "taken" as const, detail: "Taken as needed, midday" },
  { name: "Propranolol 40mg", status: "taken" as const, detail: "Taken this morning" },
  { name: "Metformin 500mg", status: "skipped" as const, detail: "Not taken yesterday evening" },
  { name: "Omeprazole 20mg", status: "pending" as const, detail: "Not yet taken this morning" },
];
