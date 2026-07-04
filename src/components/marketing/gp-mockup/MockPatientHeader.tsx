import { PATIENT } from "./data";

export default function MockPatientHeader() {
  return (
    <div className="flex flex-col gap-3 border-b border-zentic-line px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
      <div className="flex items-center gap-3.5">
        <div
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold text-white"
          style={{ backgroundColor: "#9485D4" }}
        >
          {PATIENT.initial}
        </div>
        <div>
          <p className="font-display text-base font-semibold text-zentic-ink">
            {PATIENT.name}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-sans text-xs text-zentic-ink-soft">{PATIENT.age} yrs</span>
            <span className="text-zentic-line">&middot;</span>
            <span className="font-sans text-xs font-medium text-zentic-ink-soft">
              {PATIENT.condition}
            </span>
            <span className="text-zentic-line">&middot;</span>
            <span
              className="rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold"
              style={{ backgroundColor: "#EDEAF6", color: "#7B6ABF" }}
            >
              {PATIENT.language}
            </span>
          </div>
          <p className="mt-0.5 font-sans text-[11px] text-zentic-ink-soft/70">
            Data window: {PATIENT.dataWindow}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px] font-semibold"
          style={{ backgroundColor: "#DCFCE7", color: "#15803D" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Access window active
        </div>
        <div
          className="rounded-lg px-2.5 py-1 font-mono text-xs font-semibold"
          style={{ backgroundColor: "#EDEAF6", color: "#7B6ABF", letterSpacing: "0.03em" }}
        >
          {PATIENT.accessCode}
        </div>
      </div>
    </div>
  );
}
