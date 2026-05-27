"use client";

import { useZenticStore } from "@/lib/store";
import BottomNav from "@/components/BottomNav";
import LanguagePills from "@/components/LanguagePills";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const lang = useZenticStore((s) => s.selectedLanguage);
  const isRTL = lang === "ur" || lang === "pa";

  return (
    <div className="h-dvh overflow-hidden flex items-center justify-center bg-zentic-bg md:bg-zentic-backdrop">
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="relative flex flex-col bg-zentic-bg overflow-hidden w-full h-full md:w-[390px] md:max-h-[844px] md:rounded-[28px] md:shadow-phone"
      >
        <LanguagePills />
        <div className="flex-1 overflow-y-auto min-h-0">
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
