import Link from "next/link";
import Header from "@/components/marketing/Header";
import Footer from "@/components/marketing/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="mx-auto flex max-w-3xl flex-col items-start px-6 py-24 md:px-10 md:py-32">
          <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-wider text-zentic-purple-dark">
            404
          </p>
          <h1 className="font-display text-3xl font-semibold leading-tight text-zentic-ink md:text-4xl">
            Page not found
          </h1>
          <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-zentic-ink-soft">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-zentic-deep px-7 py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-zentic-purple-dark"
          >
            Back to home
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
