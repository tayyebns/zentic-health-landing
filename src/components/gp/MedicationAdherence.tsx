"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useZenticStore } from "@/lib/store";
import type { TimeOfDay } from "@/lib/types";

const TIME_LABEL: Record<TimeOfDay, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

const STATUS_CONFIG = {
  taken: { label: "Taken", color: "#22C55E", bg: "#DCFCE7" },
  skipped: { label: "Skipped", color: "#EF4444", bg: "#FEE2E2" },
  pending: { label: "Not yet actioned", color: "#9CA3AF", bg: "#F3F4F6" },
} as const;

function getStatusKey(taken: boolean | null): keyof typeof STATUS_CONFIG {
  if (taken === true) return "taken";
  if (taken === false) return "skipped";
  return "pending";
}

export default function MedicationAdherence() {
  const medications = useZenticStore((s) => s.medications);

  const { taken, skipped, pending, pct } = useMemo(() => {
    const taken = medications.filter((m) => m.taken === true).length;
    const skipped = medications.filter((m) => m.taken === false).length;
    const pending = medications.filter((m) => m.taken === null).length;
    const pct =
      medications.length > 0
        ? Math.round((taken / medications.length) * 100)
        : 0;
    return { taken, skipped, pending, pct };
  }, [medications]);

  const donutData = [
    { name: "Taken", value: taken, color: "#22C55E" },
    { name: "Skipped", value: skipped, color: "#EF4444" },
    { name: "Pending", value: pending, color: "#E5E7EB" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-base font-semibold text-zentic-purple-dark">
          Medication Adherence
        </h3>
        <span className="font-sans text-xs text-gray-400">today</span>
      </div>

      <div className="flex items-start gap-6">
        {/* Donut chart + centre label */}
        <div className="relative flex-shrink-0" style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={donutData}
                cx={90}
                cy={90}
                innerRadius={56}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                strokeWidth={0}
              >
                {donutData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value} med${Number(value) !== 1 ? "s" : ""}`, name]}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #F3F4F6",
                  fontSize: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Centre overlay */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ top: 0 }}
          >
            <span className="font-display text-3xl font-semibold text-zentic-purple leading-none">
              {pct}%
            </span>
            <span className="font-sans text-[10px] text-gray-400 mt-1">
              adherence
            </span>
          </div>
        </div>

        {/* Legend + breakdown */}
        <div className="flex-1 min-w-0">
          {/* Donut legend */}
          <div className="space-y-2 mb-4">
            {donutData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="font-sans text-xs text-gray-600">
                    {d.name}
                  </span>
                </div>
                <span className="font-sans text-xs font-semibold text-gray-700">
                  {d.value} of {medications.length}
                </span>
              </div>
            ))}
          </div>

          {/* Per-medication table */}
          <div className="border-t border-gray-50 pt-3 space-y-2">
            {medications.map((med) => {
              const sk = getStatusKey(med.taken);
              const cfg = STATUS_CONFIG[sk];
              return (
                <div
                  key={med.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="font-sans text-xs font-semibold text-gray-700 truncate">
                      {med.name}
                      <span className="font-normal text-gray-400">
                        {" "}
                        · {med.dose}
                      </span>
                    </p>
                    <p className="font-sans text-[10px] text-gray-400">
                      {TIME_LABEL[med.timeOfDay]}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold flex-shrink-0"
                    style={{ backgroundColor: cfg.bg, color: cfg.color }}
                  >
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
