type Person = {
  name: string;
  title: string;
  linkedin: string;
  email?: string;
};

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

export default function PeopleSection({
  heading,
  people,
}: {
  heading: string;
  people: Person[];
}) {
  return (
    <div>
      <p className="font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-ink-secondary">
        {heading}
      </p>
      <div className="mt-6 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
        {people.map((person) => (
          <div key={person.name} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-0.5">
              <p className="font-ds text-ds-title text-ds-ink">
                {person.name}
              </p>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${person.name} on LinkedIn`}
                className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-ds-sm text-ds-primary transition-all duration-150 hover:bg-ds-primary-tint active:scale-[0.97] md:h-9 md:w-9"
              >
                <LinkedInIcon />
              </a>
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  aria-label={`Email ${person.name}`}
                  className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-ds-sm text-ds-primary transition-all duration-150 hover:bg-ds-primary-tint active:scale-[0.97] md:h-9 md:w-9"
                >
                  <EmailIcon />
                </a>
              )}
            </div>
            <p className="font-ds text-ds-caption font-semibold text-ds-ink-secondary">
              {person.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
