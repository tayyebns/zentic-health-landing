import { PATIENT } from "./data";

export default function MockPatientHeader() {
  return (
    <div className="flex flex-col gap-3 border-b border-ds-border px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ds-accent font-ds text-ds-title font-semibold text-white">
          {PATIENT.initial}
        </div>
        <div>
          <p className="font-ds text-ds-body-lg font-semibold text-ds-ink">
            {PATIENT.name}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-ds text-ds-caption text-ds-ink-secondary">{PATIENT.age} yrs</span>
            <span className="text-ds-border">&middot;</span>
            <span className="font-ds text-ds-caption font-medium text-ds-ink-secondary">
              {PATIENT.condition}
            </span>
            <span className="text-ds-border">&middot;</span>
            <span className="rounded-ds-sm bg-ds-primary-tint px-2 py-0.5 font-ds text-[10px] font-semibold text-ds-primary">
              {PATIENT.language}
            </span>
          </div>
          <p className="mt-0.5 font-ds text-[11px] text-ds-ink-secondary">
            Data window: {PATIENT.dataWindow}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full bg-ds-success-tint px-2.5 py-1 font-ds text-[11px] font-semibold text-ds-success">
          <span className="h-1.5 w-1.5 rounded-full bg-ds-success" />
          Access window active
        </div>
        <div
          className="rounded-ds-sm bg-ds-primary-tint px-2.5 py-1 font-mono text-xs font-semibold text-ds-primary"
          style={{ letterSpacing: "0.03em" }}
        >
          {PATIENT.accessCode}
        </div>
      </div>
    </div>
  );
}
