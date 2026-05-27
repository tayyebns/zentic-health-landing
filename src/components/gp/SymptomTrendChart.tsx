"use client";

import { useMemo } from "react";
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

function fmtDate(d: string): string {
  const [, m, day] = d.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${parseInt(day)}`;
}

function getSeverityLabel(n: number): string {
  if (n <= 2) return "Very mild";
  if (n <= 4) return "Mild";
  if (n <= 6) return "Moderate";
  if (n <= 8) return "Quite bad";
  return "Severe";
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ dataKey: string; value: number; stroke: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-lg border border-gray-100 text-xs max-w-[200px]">
      <p className="font-display font-semibold text-zentic-purple-dark mb-1.5">
        {label}
      </p>
      {payload.map((e) => (
        <p key={e.dataKey} style={{ color: e.stroke }} className="mb-0.5">
          {e.dataKey}:{" "}
          <strong>
            {e.value}/10
          </strong>{" "}
          · {getSeverityLabel(e.value)}
        </p>
      ))}
    </div>
  );
}

export default function SymptomTrendChart() {
  const symptoms = useZenticStore((s) => s.symptoms);

  const symptomTypes = useMemo(
    () => Array.from(new Set(symptoms.map((s) => s.symptom))),
    [symptoms]
  );

  const chartData = useMemo(() => {
    const dates = Array.from(new Set(symptoms.map((s) => s.date))).sort();
    return dates.map((date) => {
      const row: Record<string, unknown> = {
        date,
        displayDate: fmtDate(date),
      };
      symptoms
        .filter((s) => s.date === date)
        .forEach((s) => {
          row[s.symptom] = s.severity;
        });
      return row;
    });
  }, [symptoms]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-base font-semibold text-zentic-purple-dark">
          Symptom Severity Trend
        </h3>
        <span className="font-sans text-xs text-gray-400">
          Last 4 weeks · all symptom types
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
        >
          <defs>
            {symptomTypes.map((type) => {
              const color = getColor(type);
              const id = `gp-grad-${type.replace(/[\s/]+/g, "-")}`;
              return (
                <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.22} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
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
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            tickLine={false}
            axisLine={false}
            interval={2}
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            tickLine={false}
            axisLine={false}
            width={26}
          />
          <ReferenceLine
            y={5}
            stroke="#E5E7EB"
            strokeDasharray="5 4"
            label={{
              value: "Moderate",
              position: "insideTopRight",
              fontSize: 10,
              fill: "#9CA3AF",
              dy: -5,
            }}
          />
          <Tooltip content={<CustomTooltip />} />

          {symptomTypes.map((type) => (
            <Area
              key={type}
              type="monotone"
              dataKey={type}
              stroke={getColor(type)}
              fill={`url(#gp-grad-${type.replace(/[\s/]+/g, "-")})`}
              strokeWidth={2.5}
              connectNulls
              dot={{
                r: 4.5,
                fill: getColor(type),
                stroke: "white",
                strokeWidth: 2,
              }}
              activeDot={{ r: 6.5, fill: getColor(type) }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-5 mt-4 pt-4 border-t border-gray-50">
        {symptomTypes.map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: getColor(type) }}
            />
            <span className="font-sans text-xs text-gray-500">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
