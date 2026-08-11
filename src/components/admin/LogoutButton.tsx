"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleLogout() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={busy}
      className="inline-flex min-h-[44px] flex-shrink-0 items-center justify-center rounded-ds-md border border-ds-border bg-ds-surface px-5 py-3 font-ds text-ds-body font-semibold text-ds-ink-secondary transition-colors duration-150 hover:text-ds-primary disabled:opacity-60"
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
