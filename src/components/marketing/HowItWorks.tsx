const STEPS = [
  {
    number: "01",
    title: "Track",
    description: "Patients log symptoms, medications, and notes as they happen, not reconstructed weeks later.",
  },
  {
    number: "02",
    title: "Organise",
    description: "Entries are structured into a timeline: what changed, when, and how it's trending.",
  },
  {
    number: "03",
    title: "Share",
    description: "A time-limited access code gives the GP a clean summary at the start of the appointment.",
  },
];

export default function HowItWorks() {
  return (
    <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
      {STEPS.map((step) => (
        <li key={step.number} className="border-t-2 border-zentic-purple pt-5">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs font-semibold tracking-wider text-zentic-purple-dark">
              {step.number}
            </span>
            <h3 className="font-display text-xl font-semibold text-zentic-ink">
              {step.title}
            </h3>
          </div>
          <p className="mt-2.5 max-w-xs font-sans text-sm leading-relaxed text-zentic-ink-soft">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
