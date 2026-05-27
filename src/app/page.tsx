import Link from "next/link";

const FEATURES = [
  {
    title: "Daily Care",
    description: "Track symptoms with a tap, anytime.",
    href: "/app/daily-care",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    title: "GP Bridge",
    description: "Share your health story before every appointment.",
    href: "/app/gp-bridge",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    title: "Appointment Capture",
    description: "Never forget what your doctor said.",
    href: "/app/capture",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    title: "Reminders",
    description: "Stay on top of your medications, every day.",
    href: "/app/reminders",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: "AI Health Companion",
    description: "Answers when you need them, not a diagnosis.",
    href: "/app/chat",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Multilingual",
    description: "English, Polish, Urdu, Punjabi — your language, your health.",
    href: "/app",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: "#F3F1F8" }}
    >
      {/* Logo + wordmark */}
      <div className="flex items-center gap-3 mb-10">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#9485D4" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        <span
          className="font-display text-2xl font-semibold"
          style={{ color: "#3B2D8A" }}
        >
          Zentic Health
        </span>
      </div>

      {/* Headline */}
      <h1
        className="font-display text-4xl font-semibold text-center leading-tight mb-4 max-w-md"
        style={{ color: "#3B2D8A" }}
      >
        Weeks of health history.<br />Understood in seconds.
      </h1>

      {/* Subheadline */}
      <p className="font-sans text-base text-center text-gray-500 max-w-sm leading-relaxed mb-12">
        Zentic helps patients track symptoms, stay on medications, and share a clear picture with their GP — in the language that feels like home.
      </p>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-10 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <Link
            key={f.href + f.title}
            href={f.href}
            className="flex flex-col gap-3 bg-white rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#EDEAF6", color: "#9485D4" }}
            >
              {f.icon}
            </div>
            <div>
              <p
                className="font-display text-sm font-semibold mb-1"
                style={{ color: "#3B2D8A" }}
              >
                {f.title}
              </p>
              <p className="font-sans text-xs text-gray-500 leading-snug">
                {f.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA button */}
      <Link
        href="/app"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans font-semibold text-sm text-white shadow-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#9485D4" }}
      >
        Open the app
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>

      {/* GP dashboard link */}
      <Link
        href="/gp"
        className="mt-4 font-sans text-xs text-gray-400 hover:text-zentic-purple underline underline-offset-2"
      >
        View GP dashboard
      </Link>

      {/* Footer */}
      <p className="font-sans text-xs text-gray-400 mt-12 text-center">
        Zentic Health · Built for patients, designed for the NHS.
      </p>
    </div>
  );
}
