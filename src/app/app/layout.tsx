import BottomNav from "@/components/BottomNav";
import LanguagePills from "@/components/LanguagePills";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zentic-backdrop p-4">
      <div
        className="relative flex flex-col bg-zentic-bg overflow-hidden"
        style={{
          width: 390,
          height: 844,
          borderRadius: 28,
          boxShadow: "0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.10)",
        }}
      >
        {/* Top bar: language pills */}
        <LanguagePills />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Fixed bottom navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
