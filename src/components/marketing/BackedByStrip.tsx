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
      <p className="w-32 flex-shrink-0 font-sans text-xs font-semibold uppercase tracking-wider text-zentic-ink-soft">
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
            className="opacity-60 transition-opacity duration-200 hover:opacity-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              className="h-11 w-auto object-contain md:h-12"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
