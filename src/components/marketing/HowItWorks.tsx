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
    <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
      {STEPS.map((step, i) => (
        <li key={step.title}>
          {/* Number sits in the same grid cell as its title, so it's
              guaranteed to line up. The connecting line bleeds into the
              column gap (md:-mr-8 cancels md:gap-8) to reach the next
              circle without needing a separate, unaligned rail. */}
          <div className="mb-4 flex items-center" aria-hidden="true">
            <StepNumber n={i + 1} />
            {i < STEPS.length - 1 && (
              <span className="ml-3 hidden h-px flex-1 bg-ds-border md:-mr-8 md:block" />
            )}
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
  );
}
