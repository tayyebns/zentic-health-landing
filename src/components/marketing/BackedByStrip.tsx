const LOGOS = [
  {
    name: "University of Birmingham",
    src: "/logos/university-of-birmingham.png",
    href: "https://www.birmingham.ac.uk/",
  },
  {
    name: "Birmingham City University",
    src: "/logos/birmingham-city-university.png",
    href: "https://www.bcu.ac.uk/",
  },
  {
    name: "Redwood Founders",
    src: "/logos/redwood-founders.jpeg",
    href: "https://redwoodfounders.org/",
  },
];

export default function BackedByStrip() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
      <p className="w-32 flex-shrink-0 font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-ink-secondary">
        Backed by
      </p>
      <div className="flex flex-wrap items-center gap-4">
        {LOGOS.map((logo) => (
          <a
            key={logo.name}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={logo.name}
            className="flex h-16 items-center justify-center rounded-ds-lg border border-ds-border bg-ds-surface px-5 shadow-ds-card transition-transform duration-150 active:scale-[0.97] md:h-20 md:px-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              className="h-8 w-auto max-w-[7rem] object-contain md:h-10 md:max-w-[8rem]"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
