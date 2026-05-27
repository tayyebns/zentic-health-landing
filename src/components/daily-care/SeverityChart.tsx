"use client";

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useZenticStore } from "@/lib/store";
import type { SymptomEntry } from "@/lib/types";

// ── Colour map ────────────────────────────────────────────────────────────────

const SYMPTOM_COLORS: Record<string, string> = {
  Headache: "#9485D4",
  Tiredness: "#F59E0B",
  "Back Pain": "#10B981",
  Nausea: "#F97316",
  Dizziness: "#3B82F6",
  "Chest tightness": "#EF4444",
  "Joint pain": "#8B5CF6",
  Breathlessness: "#06B6D4",
  "Stomach ache": "#EC4899",
  Anxiety: "#6366F1",
  Palpitations: "#DC2626",
  "Swollen ankles": "#059669",
};

function getColor(symptom: string): string {
  return SYMPTOM_COLORS[symptom] ?? "#9485D4";
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const [, m, d] = dateStr.split("-");
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];
  return `${months[parseInt(m) - 1]} ${parseInt(d)}`;
}

function getSeverityLabel(n: number): string {
  if (n <= 2) return "Very mild";
  if (n <= 4) return "Mild";
  if (n <= 6) return "Moderate";
  if (n <= 8) return "Quite bad";
  return "Severe";
}

function computeTrend(
  entries: SymptomEntry[]
): "Improving" | "Stable" | "Worsening" {
  if (entries.length < 4) return "Stable";
  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const mid = Math.floor(sorted.length / 2);
  const avgOld =
    sorted.slice(0, mid).reduce((s, e) => s + e.severity, 0) / mid;
  const avgNew =
    sorted.slice(mid).reduce((s, e) => s + e.severity, 0) /
    (sorted.length - mid);
  const diff = avgNew - avgOld;
  if (diff < -0.5) return "Improving";
  if (diff > 0.5) return "Worsening";
  return "Stable";
}

// ── Custom tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; stroke: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-zentic-purple-light text-xs max-w-[170px]">
      <p className="font-semibold text-zentic-purple-dark mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.stroke }}>
          {entry.dataKey}:{" "}
          <strong>
            {entry.value}/10
          </strong>{" "}
          · {getSeverityLabel(entry.value)}
        </p>
      ))}
    </div>
  );
}

// ── Trend badge ───────────────────────────────────────────────────────────────

const TREND_CONFIG = {
  Improving: {
    color: "#16A34A",
    bg: "#DCFCE7",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  Stable: {
    color: "#D97706",
    bg: "#FEF3C7",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
  },
  Worsening: {
    color: "#DC2626",
    bg: "#FEE2E2",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
  },
};

// ── Main component ────────────────────────────────────────────────────────────

export default function SeverityChart() {
  const symptoms = useZenticStore((s) => s.symptoms);
  const [filter, setFilter] = useState("All");

  const symptomTypes = useMemo(
    () => Array.from(new Set(symptoms.map((s) => s.symptom))),
    [symptoms]
  );

  const filters = ["All", ...symptomTypes];

  const { chartData, activeTypes } = useMemo(() => {
    const relevant =
      filter === "All"
        ? symptoms
        : symptoms.filter((s) => s.symptom === filter);

    const dates = Array.from(new Set(relevant.map((s) => s.date))).sort();

    const chartData = dates.map((date) => {
      const row: Record<string, unknown> = {
        date,
        displayDate: formatDate(date),
      };
      relevant
        .filter((s) => s.date === date)
        .forEach((s) => {
          row[s.symptom] = s.severity;
        });
      return row;
    });

    const activeTypes =
      filter === "All" ? symptomTypes : [filter];

    return { chartData, activeTypes };
  }, [symptoms, filter, symptomTypes]);

  const filteredForTrend =
    filter === "All" ? symptoms : symptoms.filter((s) => s.symptom === filter);
  const trend = computeTrend(filteredForTrend);
  const tc = TREND_CONFIG[trend];

  return (
    <div className="px-4 mt-1">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-sm font-semibold text-zentic-purple-dark">
            Symptom Severity
          </h2>
          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: tc.bg, color: tc.color }}
          >
            {tc.icon}
            <span>{trend}</span>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all"
              style={{
                backgroundColor:
                  filter === f
                    ? f === "All"
                      ? "#9485D4"
                      : getColor(f)
                    : "#F3F4F6",
                color: filter === f ? "white" : "#6B7280",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Chart with animated transition on filter change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart
                data={chartData}
                margin={{ top: 6, right: 4, bottom: 0, left: -20 }}
              >
                <defs>
                  {activeTypes.map((type) => {
                    const color = getColor(type);
                    const id = `grad-${type.replace(/[\s/]+/g, "-")}`;
                    return (
                      <linearGradient
                        key={id}
                        id={id}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={color}
                          stopOpacity={0.28}
                        />
                        <stop
                          offset="95%"
                          stopColor={color}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    );
                  })}
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F3F4F6"
                  vertical={false}
                />
                <XAxis
                  dataKey="displayDate"
                  tick={{ fontSize: 9, fill: "#9CA3AF" }}
                  tickLine={false}
                  axisLine={false}
                  interval={3}
                />
                <YAxis
                  domain={[0, 10]}
                  ticks={[0, 5, 10]}
                  tick={{ fontSize: 9, fill: "#9CA3AF" }}
                  tickLine={false}
                  axisLine={false}
                  width={20}
                />
                <ReferenceLine
                  y={5}
                  stroke="#D1D5DB"
                  strokeDasharray="4 4"
                  label={{
                    value: "Moderate",
                    position: "insideTopRight",
                    fontSize: 9,
                    fill: "#9CA3AF",
                    dy: -4,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />

                {activeTypes.map((type) => (
                  <Area
                    key={type}
                    type="monotone"
                    dataKey={type}
                    stroke={getColor(type)}
                    fill={`url(#grad-${type.replace(/[\s/]+/g, "-")})`}
                    strokeWidth={2}
                    connectNulls
                    dot={{
                      r: 3.5,
                      fill: getColor(type),
                      stroke: "white",
                      strokeWidth: 1.5,
                    }}
                    activeDot={{ r: 5, fill: getColor(type) }}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
