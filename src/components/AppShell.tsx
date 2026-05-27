"use client";

import { useZenticStore } from "@/lib/store";
import BottomNav from "@/components/BottomNav";
import LanguagePills from "@/components/LanguagePills";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const lang = useZenticStore((s) => s.selectedLanguage);
  const isRTL = lang === "ur" || lang === "pa";

  return (
    <div className="min-h-screen flex items-center justify-center bg-zentic-backdrop p-4">
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="relative flex flex-col bg-zentic-bg overflow-hidden"
        style={{
          width: 390,
          height: 844,
          borderRadius: 28,
          boxShadow: "0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.10)",
        }}
      >
        <LanguagePills />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
