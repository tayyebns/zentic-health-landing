"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { FREQUENCY_DATA, SYMPTOM_COLORS, DS_COLORS } from "./data";

export default function MockFrequencyChart() {
  return (
    <div className="rounded-ds-lg bg-ds-surface p-4 shadow-ds-card md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-ds text-ds-body font-semibold text-ds-ink">
          Symptom Frequency
        </h4>
        <span className="font-ds text-[11px] text-ds-ink-secondary">by occurrence</span>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <BarChart
          layout="vertical"
          data={FREQUENCY_DATA}
          margin={{ top: 0, right: 24, bottom: 0, left: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={DS_COLORS.border} horizontal={false} />
          <XAxis type="number" allowDecimals={false} hide />
          <YAxis
            type="category"
            dataKey="symptom"
            tick={{ fontSize: 11, fill: DS_COLORS.ink }}
            tickLine={false}
            axisLine={false}
            width={70}
          />
          <Tooltip
            cursor={{ fill: DS_COLORS.border }}
            contentStyle={{ borderRadius: 8, border: `1px solid ${DS_COLORS.border}`, fontSize: 12 }}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {FREQUENCY_DATA.map((entry) => (
              <Cell key={entry.symptom} fill={SYMPTOM_COLORS[entry.symptom]} />
            ))}
            <LabelList dataKey="count" position="right" style={{ fontSize: 11, fill: DS_COLORS.inkSecondary }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
