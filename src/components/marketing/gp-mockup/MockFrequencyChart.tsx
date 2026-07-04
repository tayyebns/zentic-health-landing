"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import { FREQUENCY_DATA, SYMPTOM_COLORS } from "./data";

export default function MockFrequencyChart() {
  return (
    <div className="rounded-2xl bg-white p-4 md:p-5" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}>
      <div className="mb-4 flex items-center justify-between">
        <h4 className="font-display text-sm font-semibold text-zentic-ink">
          Symptom Frequency
        </h4>
        <span className="font-sans text-[11px] text-zentic-ink-soft/70">by occurrence</span>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <BarChart
          layout="vertical"
          data={FREQUENCY_DATA}
          margin={{ top: 0, right: 24, bottom: 0, left: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F1F8" horizontal={false} />
          <XAxis type="number" allowDecimals={false} hide />
          <YAxis
            type="category"
            dataKey="symptom"
            tick={{ fontSize: 11, fill: "#171633" }}
            tickLine={false}
            axisLine={false}
            width={70}
          />
          <Tooltip
            cursor={{ fill: "#F3F1F8" }}
            contentStyle={{ borderRadius: 8, border: "1px solid #E3E0EC", fontSize: 12 }}
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {FREQUENCY_DATA.map((entry) => (
              <Cell key={entry.symptom} fill={SYMPTOM_COLORS[entry.symptom]} />
            ))}
            <LabelList dataKey="count" position="right" style={{ fontSize: 11, fill: "#54506E" }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
