"use client";

import { useZenticStore } from "@/lib/store";
import type { Language } from "@/lib/types";

const PILLS: { code: string; lang: Language }[] = [
  { code: "EN", lang: "en" },
  { code: "PL", lang: "pl" },
  { code: "UR", lang: "ur" },
  { code: "PA", lang: "pa" },
];

export default function LanguagePills() {
  const selectedLanguage = useZenticStore((s) => s.selectedLanguage);
  const setLanguage = useZenticStore((s) => s.setLanguage);

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-zentic-purple-light">
      {PILLS.map(({ code, lang }) => {
        const active = selectedLanguage === lang;
        return (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className="rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors"
            style={{
              backgroundColor: active ? "#9485D4" : "white",
              color: active ? "white" : "#7B6ABF",
              border: `1.5px solid #9485D4`,
            }}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
