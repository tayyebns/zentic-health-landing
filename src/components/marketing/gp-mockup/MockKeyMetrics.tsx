import { KEY_METRICS } from "./data";

export default function MockKeyMetrics() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {KEY_METRICS.map((metric) => (
        <div
          key={metric.label}
          className="rounded-ds-lg bg-ds-primary-tint px-4 py-3"
        >
          <p className="font-ds text-ds-stat tabular-nums text-ds-primary">
            {metric.value}
          </p>
          <p className="mt-0.5 font-ds text-ds-caption font-semibold text-ds-ink">
            {metric.label}
          </p>
          <p className="font-ds text-[10px] text-ds-ink-secondary">{metric.sub}</p>
        </div>
      ))}
    </div>
  );
}
