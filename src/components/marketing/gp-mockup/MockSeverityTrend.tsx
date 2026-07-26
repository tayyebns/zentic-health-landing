"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TREND_DATA, SYMPTOM_COLORS, DS_COLORS } from "./data";

interface DotProps {
  cx?: number;
  cy?: number;
  value?: number | null;
}

function CircleDot({ cx, cy, value }: DotProps) {
  if (value === null || value === undefined || cx === undefined || cy === undefined) return null;
  return <circle cx={cx} cy={cy} r={4.5} fill={SYMPTOM_COLORS.Migraine} stroke="white" strokeWidth={2} />;
}

function SquareDot({ cx, cy, value }: DotProps) {
  if (value === null || value === undefined || cx === undefined || cy === undefined) return null;
  return (
    <rect
      x={cx - 4}
      y={cy - 4}
      width={8}
      height={8}
      fill={SYMPTOM_COLORS.Nausea}
      stroke="white"
      strokeWidth={2}
    />
  );
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
    <div className="rounded-ds-sm border border-ds-border bg-ds-surface px-3 py-2 text-xs shadow-ds-card">
      <p className="mb-1 font-ds font-semibold text-ds-ink">{label}</p>
      {payload
        .filter((p) => p.value !== null && p.value !== undefined)
        .map((p) => (
          <p key={p.dataKey} style={{ color: p.stroke }}>
            {p.dataKey}: <strong>{p.value}/10</strong>
          </p>
        ))}
    </div>
  );
}

export default function MockSeverityTrend() {
  return (
    <div className="rounded-ds-lg bg-ds-surface p-4 shadow-ds-card md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-ds text-ds-body font-semibold text-ds-ink">
          Symptom Severity Trend
        </h4>
        <span className="font-ds text-[11px] text-ds-ink-secondary">last 4 weeks</span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={TREND_DATA} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={DS_COLORS.border} vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: DS_COLORS.inkSecondary }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 5, 10]}
            tick={{ fontSize: 10, fill: DS_COLORS.inkSecondary }}
            tickLine={false}
            axisLine={false}
            width={28}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="Migraine"
            stroke={SYMPTOM_COLORS.Migraine}
            strokeWidth={2.5}
            dot={<CircleDot />}
            activeDot={{ r: 6, fill: SYMPTOM_COLORS.Migraine }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="Nausea"
            stroke={SYMPTOM_COLORS.Nausea}
            strokeWidth={2.5}
            strokeDasharray="6 4"
            dot={<SquareDot />}
            activeDot={{ r: 6, fill: SYMPTOM_COLORS.Nausea }}
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend with shape + line-style cues, not color alone */}
      <div className="mt-3 flex flex-wrap gap-5 border-t border-ds-border pt-3">
        <div className="flex items-center gap-2">
          <svg width="20" height="10" viewBox="0 0 20 10">
            <line x1="0" y1="5" x2="20" y2="5" stroke={SYMPTOM_COLORS.Migraine} strokeWidth="2.5" />
            <circle cx="10" cy="5" r="3.5" fill={SYMPTOM_COLORS.Migraine} />
          </svg>
          <span className="font-ds text-ds-body text-ds-ink-secondary">Migraine (solid, circle)</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="20" height="10" viewBox="0 0 20 10">
            <line x1="0" y1="5" x2="20" y2="5" stroke={SYMPTOM_COLORS.Nausea} strokeWidth="2.5" strokeDasharray="4 3" />
            <rect x="7" y="2" width="6" height="6" fill={SYMPTOM_COLORS.Nausea} />
          </svg>
          <span className="font-ds text-ds-body text-ds-ink-secondary">Nausea (dashed, square)</span>
        </div>
      </div>
    </div>
  );
}
