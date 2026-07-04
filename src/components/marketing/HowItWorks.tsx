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
    title: "Share",
    description: "A time-limited access code gives the GP a clean summary at the start of the appointment.",
  },
];

export default function HowItWorks() {
  return (
    <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
      {STEPS.map((step) => (
        <li key={step.title} className="border-t-2 border-zentic-purple pt-5">
          <h3 className="font-display text-xl font-semibold text-zentic-ink">
            {step.title}
          </h3>
          <p className="mt-2.5 max-w-xs font-sans text-sm leading-relaxed text-zentic-ink-soft">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
