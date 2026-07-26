"use client";

import { useState } from "react";

export default function CopyableEmail({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <span className="inline-flex items-center gap-2">
      <a href={`mailto:${email}`} className={className}>
        {email}
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy email address"
        className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-ds-sm text-ds-ink-secondary transition-all duration-150 hover:bg-ds-accent-soft hover:text-ds-primary active:scale-[0.97] md:h-8 md:w-8"
      >
        {copied ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
      {copied && (
        <span className="font-ds text-ds-caption font-medium text-ds-primary">Copied</span>
      )}
    </span>
  );
}
