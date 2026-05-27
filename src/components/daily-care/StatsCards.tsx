"use client";

import { useMemo } from "react";
import { useZenticStore } from "@/lib/store";

export default function StatsCards() {
  const symptoms = useZenticStore((s) => s.symptoms);

  const { total, thisWeek, avgSeverity } = useMemo(() => {
    const total = symptoms.length;
    const weekCutoff = "2026-05-20";
    const thisWeek = symptoms.filter((s) => s.date >= weekCutoff).length;
    const avgSeverity =
      total > 0
        ? (symptoms.reduce((sum, s) => sum + s.severity, 0) / total).toFixed(1)
        : "0.0";
    return { total, thisWeek, avgSeverity };
  }, [symptoms]);

  return (
    <div className="grid grid-cols-3 gap-2 px-4 pt-1 pb-2">
      <StatCard label="Total logged" value={String(total)} />
      <StatCard label="This week" value={String(thisWeek)} />
      <StatCard label="Avg severity" value={`${avgSeverity}/10`} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl px-2 py-3 shadow-sm flex flex-col items-center gap-1">
      <span className="font-display text-lg font-semibold text-zentic-purple leading-none">
        {value}
      </span>
      <span className="font-sans text-[10px] text-gray-400 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}
