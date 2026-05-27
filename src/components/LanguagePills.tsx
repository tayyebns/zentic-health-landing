"use client";

import { useState } from "react";

const LANGUAGES = ["EN", "PL", "UR", "PA"] as const;
type Lang = (typeof LANGUAGES)[number];

export default function LanguagePills() {
  const [selected, setSelected] = useState<Lang>("EN");

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-zentic-purple-light">
      {LANGUAGES.map((lang) => {
        const active = selected === lang;
        return (
          <button
            key={lang}
            onClick={() => setSelected(lang)}
            className="rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors"
            style={{
              backgroundColor: active ? "#9485D4" : "white",
              color: active ? "white" : "#7B6ABF",
              border: `1.5px solid ${active ? "#9485D4" : "#9485D4"}`,
            }}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
}
