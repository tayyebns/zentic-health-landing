"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useZenticStore } from "@/lib/store";

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

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { symptom: string; count: number } }>;
}) {
  if (!active || !payload?.length) return null;
  const { symptom, count } = payload[0].payload;
  return (
    <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 text-xs">
      <p className="font-semibold text-zentic-purple-dark">{symptom}</p>
      <p className="text-gray-500">
        {count} entr{count === 1 ? "y" : "ies"}
      </p>
    </div>
  );
}

export default function SymptomFrequencyChart() {
  const symptoms = useZenticStore((s) => s.symptoms);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    symptoms.forEach((s) => {
      counts[s.symptom] = (counts[s.symptom] ?? 0) + 1;
    });
    return Object.entries(counts)
      .map(([symptom, count]) => ({ symptom, count }))
      .sort((a, b) => b.count - a.count);
  }, [symptoms]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-base font-semibold text-zentic-purple-dark">
          Symptom Frequency
        </h3>
        <span className="font-sans text-xs text-gray-400">by occurrence</span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 0, right: 20, bottom: 0, left: 4 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F3F4F6"
            horizontal={false}
          />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="symptom"
            tick={{ fontSize: 11, fill: "#374151" }}
            tickLine={false}
            axisLine={false}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F3F1F8" }} />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={32}>
            {chartData.map((entry) => (
              <Cell
                key={entry.symptom}
                fill={getColor(entry.symptom)}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Summary line */}
      <p className="font-sans text-[11px] text-gray-400 mt-4 pt-4 border-t border-gray-50">
        {chartData.length} distinct symptom type
        {chartData.length !== 1 ? "s" : ""} recorded across{" "}
        {symptoms.length} total entries
      </p>
    </div>
  );
}
