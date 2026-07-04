const FOUNDERS = [
  {
    name: "Saba Shahzad",
    title: "Co-Founder, Product & Strategy",
    linkedin: "https://www.linkedin.com/in/saba-s/",
    email: "sabashahzad850@gmail.com",
  },
  {
    name: "Tayyeb Nadeem Somro",
    title: "Co-Founder, Growth & Tech",
    linkedin: "https://www.linkedin.com/in/tayyeb-nadeem-somro/",
    email: "tayyebnadeemsomro@gmail.com",
  },
];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

export default function FoundersSection() {
  return (
    <div>
      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-zentic-ink-soft">
        Founders
      </p>
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {FOUNDERS.map((founder) => (
          <div key={founder.name} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-0.5">
              <p className="font-display text-lg font-semibold text-zentic-ink">
                {founder.name}
              </p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${founder.name} on LinkedIn`}
                className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center text-zentic-purple transition-opacity hover:opacity-70 md:h-7 md:w-7"
              >
                <LinkedInIcon />
              </a>
              <a
                href={`mailto:${founder.email}`}
                aria-label={`Email ${founder.name}`}
                className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center text-zentic-purple transition-opacity hover:opacity-70 md:h-7 md:w-7"
              >
                <EmailIcon />
              </a>
            </div>
            <p className="font-sans text-xs font-semibold text-zentic-ink-soft">
              {founder.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
