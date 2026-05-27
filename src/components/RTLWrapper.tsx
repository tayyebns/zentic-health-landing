"use client";

import { useZenticStore } from "@/lib/store";

export default function RTLWrapper({ children }: { children: React.ReactNode }) {
  const lang = useZenticStore((s) => s.selectedLanguage);
  const isRTL = lang === "ur" || lang === "pa";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="contents">
      {children}
    </div>
  );
}
