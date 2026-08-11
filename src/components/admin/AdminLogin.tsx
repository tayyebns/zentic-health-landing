"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data?.error ?? "Could not sign in. Please try again.");
        setBusy(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ds-bg px-5 py-16">
      <div className="w-full max-w-sm">
        <h1 className="font-ds text-ds-h1 text-ds-ink">Zentic Health admin</h1>
        <p className="mt-2 font-ds text-ds-body text-ds-ink-secondary">
          Enter the admin password to view signups.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-ds-xl border border-ds-border bg-ds-surface p-6 shadow-ds-card"
        >
          <label
            htmlFor="admin-password"
            className="mb-1.5 block font-ds text-ds-body font-semibold text-ds-ink"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full min-h-[44px] rounded-ds-md border border-ds-border bg-ds-bg px-3.5 py-3 font-ds text-ds-body text-ds-ink transition-colors duration-150 focus:border-ds-accent focus:bg-ds-surface"
          />

          {error && (
            <p
              role="alert"
              className="mt-3 rounded-ds-md border border-ds-alert/30 bg-ds-alert-tint px-3 py-2 font-ds text-ds-caption font-medium text-ds-alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || password.length === 0}
            className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-ds-md bg-ds-primary px-6 py-3 font-ds text-ds-body font-semibold text-white transition-transform duration-150 hover:opacity-95 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
