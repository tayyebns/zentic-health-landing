"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "@/components/Wordmark";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "For GP Practices", href: "/for-gps" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-ds-border bg-ds-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex flex-shrink-0 items-center" aria-label="Zentic Health">
          <Wordmark size="base" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-ds-sm px-4 py-2 font-ds text-ds-body transition-colors ${
                  isActive
                    ? "bg-ds-primary-tint font-semibold text-ds-primary"
                    : "font-medium text-ds-ink-secondary hover:text-ds-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-ds-sm text-ds-ink transition-transform duration-150 active:scale-[0.97] md:hidden"
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-ds-border bg-ds-surface md:hidden"
        >
          <div className="px-3 py-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-[44px] items-center rounded-ds-sm px-3 py-3 font-ds text-ds-body transition-colors ${
                    isActive
                      ? "bg-ds-primary-tint font-semibold text-ds-primary"
                      : "font-medium text-ds-ink-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
