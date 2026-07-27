const STEPS = [
  {
    title: "Track",
    description: "Patients log symptoms, medications, and notes as they happen, not reconstructed weeks later.",
  },
  {
    title: "Organise",
    description: "Entries are structured into a timeline: what changed, when, and how it's trending.",
  },
  {
    title: "Download",
    description: "Patients can optionally download a clean PDF summary to bring to their next appointment.",
  },
];

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-ds-primary-tint font-ds text-ds-body font-semibold text-ds-primary">
      {n}
    </span>
  );
}

export default function HowItWorks() {
  return (
    <div>
      {/* Connected timeline rail, desktop only */}
      <div className="mb-6 hidden items-center md:flex" aria-hidden="true">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex flex-1 items-center last:flex-none">
            <StepNumber n={i + 1} />
            {i < STEPS.length - 1 && (
              <span className="mx-3 h-px flex-1 bg-ds-border" />
            )}
          </div>
        ))}
      </div>

      <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((step, i) => (
          <li key={step.title}>
            <div className="mb-4 md:hidden">
              <StepNumber n={i + 1} />
            </div>
            <h3 className="font-ds text-ds-title text-ds-ink">
              {step.title}
            </h3>
            <p className="mt-2.5 max-w-xs font-ds text-ds-body text-ds-ink-secondary">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
