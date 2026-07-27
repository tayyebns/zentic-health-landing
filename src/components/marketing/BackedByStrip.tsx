const LOGOS = [
  {
    name: "University of Birmingham",
    src: "/logos/university-of-birmingham.png",
    href: "https://www.birmingham.ac.uk/",
    variant: "lockup" as const,
  },
  {
    name: "Birmingham City University",
    src: "/logos/birmingham-city-university.png",
    href: "https://www.bcu.ac.uk/",
    variant: "lockup" as const,
  },
  {
    name: "Redwood Founders",
    src: "/logos/redwood-founders.jpeg",
    href: "https://redwoodfounders.org/",
    variant: "icon" as const,
  },
];

export default function BackedByStrip() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
      <p className="w-32 flex-shrink-0 font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-ink-secondary">
        Backed by
      </p>
      <div className="flex flex-wrap items-center gap-8">
        {LOGOS.map((logo) => (
          <a
            key={logo.name}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={logo.name}
            className="flex items-center gap-3 transition-transform duration-150 active:scale-[0.97]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt=""
              className={
                logo.variant === "icon"
                  ? "h-12 w-12 flex-shrink-0 rounded-ds-sm object-cover md:h-14 md:w-14"
                  : "h-10 w-auto max-w-[9rem] object-contain md:h-12 md:max-w-[10rem]"
              }
            />
            {logo.variant === "icon" && (
              <span className="font-ds text-ds-title font-bold text-ds-ink">
                {logo.name}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
