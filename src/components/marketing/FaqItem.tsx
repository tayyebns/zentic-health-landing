"use client";

import { useRef } from "react";

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  const answerRef = useRef<HTMLParagraphElement>(null);

  function handleToggle(e: React.SyntheticEvent<HTMLDetailsElement>) {
    const el = answerRef.current;
    if (!e.currentTarget.open || !el) return;

    // Force the reveal animation to replay identically every time, rather
    // than relying on the browser's display:none -> block restart, which
    // isn't guaranteed to look the same across engines/timings.
    el.classList.remove("animate-faq-reveal");
    void el.offsetWidth;
    el.classList.add("animate-faq-reveal");
  }

  return (
    <details name="faq" className="group py-5" onToggle={handleToggle}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-ds text-ds-title text-ds-ink">
        {question}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 text-ds-ink-secondary transition-transform duration-150 group-open:rotate-180"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <p ref={answerRef} className="animate-faq-reveal mt-3 font-ds text-ds-body text-ds-ink-secondary">
        {answer}
      </p>
    </details>
  );
}
