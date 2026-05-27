"use client";

import { useZenticStore } from "@/lib/store";
import BottomNav from "@/components/BottomNav";
import LanguagePills from "@/components/LanguagePills";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const lang = useZenticStore((s) => s.selectedLanguage);
  const isRTL = lang === "ur" || lang === "pa";

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-zentic-backdrop">
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="relative flex flex-col bg-zentic-bg overflow-hidden"
        style={{
          width: 390,
          height: "min(844px, 100vh)",
          borderRadius: 28,
          boxShadow: "0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.10)",
        }}
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
