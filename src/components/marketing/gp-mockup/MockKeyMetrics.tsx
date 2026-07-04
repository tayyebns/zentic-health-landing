import { KEY_METRICS } from "./data";

export default function MockKeyMetrics() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {KEY_METRICS.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl px-4 py-3"
          style={{ backgroundColor: "#F3F1F8" }}
        >
          <p className="font-display text-xl font-semibold leading-tight text-zentic-purple-dark">
            {metric.value}
          </p>
          <p className="mt-0.5 font-sans text-xs font-semibold text-zentic-ink">
            {metric.label}
          </p>
          <p className="font-sans text-[10px] text-zentic-ink-soft/70">{metric.sub}</p>
        </div>
      ))}
    </div>
  );
}
