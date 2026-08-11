"use client";

import { useMemo, useState } from "react";
import type { SignupRecord } from "@/lib/signups-store";

type SortKey = "created_at" | "first_name" | "email" | "interest" | "source";

// Fixed time zone so the server-rendered markup and the client render agree,
// and so dates read as UK local time regardless of the viewer's machine.
const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/London",
});

function formatDate(value?: string): string {
  if (!value) return "—";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "—" : DATE_FORMAT.format(parsed);
}

function YesNo({ value }: { value: boolean | null }) {
  if (value === null || value === undefined) {
    return <span className="text-ds-ink-tertiary">Not answered</span>;
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-ds-caption font-semibold ${
        value ? "bg-ds-success-tint text-ds-success" : "bg-ds-secondary-bg text-ds-ink-secondary"
      }`}
    >
      {value ? "Yes" : "No"}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-ds-lg border border-ds-border bg-ds-surface px-4 py-3 shadow-ds-card">
      <p className="font-ds text-ds-caption text-ds-ink-secondary">{label}</p>
      <p className="mt-1 font-ds text-ds-stat text-ds-ink">{value}</p>
    </div>
  );
}

function toCsv(rows: SignupRecord[]): string {
  const headers = [
    "Signed up",
    "First name",
    "Last name",
    "Email",
    "Reason",
    "Early tester",
    "Marketing consent",
    "Signed up from",
    "Last updated",
    "ID",
  ];

  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value);
    // Prefix formula-like values so spreadsheets treat them as text, not code.
    const safe = /^[=+\-@]/.test(text) ? `'${text}` : text;
    return `"${safe.replace(/"/g, '""')}"`;
  };

  const lines = rows.map((row) =>
    [
      row.created_at ?? "",
      row.first_name,
      row.last_name,
      row.email,
      row.interest ?? "",
      row.early_tester === null ? "" : row.early_tester ? "Yes" : "No",
      row.marketing_consent ? "Yes" : "No",
      row.source,
      row.updated_at ?? "",
      row.id ?? "",
    ]
      .map(escape)
      .join(","),
  );

  return [headers.map(escape).join(","), ...lines].join("\n");
}

export default function SignupsTable({ rows }: { rows: SignupRecord[] }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [ascending, setAscending] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = needle
      ? rows.filter((row) =>
          [row.first_name, row.last_name, row.email, row.interest ?? "", row.source]
            .join(" ")
            .toLowerCase()
            .includes(needle),
        )
      : rows;

    return [...filtered].sort((a, b) => {
      const left = String(a[sortKey] ?? "").toLowerCase();
      const right = String(b[sortKey] ?? "").toLowerCase();
      if (left === right) return 0;
      return ascending ? left.localeCompare(right) : right.localeCompare(left);
    });
  }, [rows, query, sortKey, ascending]);

  const stats = useMemo(
    () => ({
      total: rows.length,
      testers: rows.filter((r) => r.early_tester === true).length,
      marketing: rows.filter((r) => r.marketing_consent).length,
    }),
    [rows],
  );

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setAscending((prev) => !prev);
    } else {
      setSortKey(key);
      setAscending(false);
    }
  }

  function downloadCsv() {
    const blob = new Blob([toCsv(visible)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `zentic-signups-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function copyEmail(email: string) {
    await navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied((prev) => (prev === email ? null : prev)), 1600);
  }

  const SortButton = ({ label, sortKey: key }: { label: string; sortKey: SortKey }) => (
    <button
      type="button"
      onClick={() => handleSort(key)}
      className="inline-flex items-center gap-1 font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-ink-secondary hover:text-ds-primary"
    >
      {label}
      {sortKey === key && (
        <span aria-hidden="true" className="text-ds-accent">
          {ascending ? "▲" : "▼"}
        </span>
      )}
    </button>
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Total signups" value={stats.total} />
        <Stat label="Want to be early testers" value={stats.testers} />
        <Stat label="Opted into marketing" value={stats.marketing} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="admin-search" className="sr-only">
            Search signups
          </label>
          <input
            id="admin-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, or reason"
            className="w-full min-h-[44px] rounded-ds-md border border-ds-border bg-ds-surface px-3.5 py-3 font-ds text-ds-body text-ds-ink placeholder:text-ds-ink-tertiary focus:border-ds-accent"
          />
        </div>

        <button
          type="button"
          onClick={downloadCsv}
          disabled={visible.length === 0}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-ds-md bg-ds-primary px-5 py-3 font-ds text-ds-body font-semibold text-white transition-transform duration-150 hover:opacity-95 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12" />
            <polyline points="7 11 12 16 17 11" />
            <path d="M4 20h16" />
          </svg>
          Download CSV
        </button>
      </div>

      {query && (
        <p className="mt-3 font-ds text-ds-caption text-ds-ink-secondary">
          Showing {visible.length} of {rows.length}
        </p>
      )}

      {rows.length === 0 ? (
        <div className="mt-6 rounded-ds-xl border border-dashed border-ds-border bg-ds-surface px-6 py-14 text-center">
          <p className="font-ds text-ds-title text-ds-ink">No signups yet</p>
          <p className="mt-2 font-ds text-ds-body text-ds-ink-secondary">
            New signups from the website will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-ds-xl border border-ds-border bg-ds-surface shadow-ds-card">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead className="border-b border-ds-border bg-ds-bg">
              <tr>
                <th scope="col" className="px-4 py-3"><SortButton label="Signed up" sortKey="created_at" /></th>
                <th scope="col" className="px-4 py-3"><SortButton label="Name" sortKey="first_name" /></th>
                <th scope="col" className="px-4 py-3"><SortButton label="Email" sortKey="email" /></th>
                <th scope="col" className="px-4 py-3"><SortButton label="Reason" sortKey="interest" /></th>
                <th scope="col" className="px-4 py-3 font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-ink-secondary">Early tester</th>
                <th scope="col" className="px-4 py-3 font-ds text-ds-caption font-semibold uppercase tracking-wider text-ds-ink-secondary">Marketing</th>
                <th scope="col" className="px-4 py-3"><SortButton label="From" sortKey="source" /></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row, index) => (
                <tr
                  key={row.id ?? `${row.email}-${index}`}
                  className="border-b border-ds-border last:border-b-0 hover:bg-ds-bg/60"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-ds text-ds-body text-ds-ink-secondary">
                    {formatDate(row.created_at)}
                  </td>
                  <td className="px-4 py-3 font-ds text-ds-body font-medium text-ds-ink">
                    {row.first_name} {row.last_name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <a
                        href={`mailto:${row.email}`}
                        className="font-ds text-ds-body text-ds-primary hover:underline"
                      >
                        {row.email}
                      </a>
                      <button
                        type="button"
                        onClick={() => copyEmail(row.email)}
                        aria-label={`Copy ${row.email}`}
                        className="text-ds-ink-tertiary hover:text-ds-primary"
                      >
                        {copied === row.email ? (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-ds text-ds-body text-ds-ink-secondary">
                    {row.interest ?? <span className="text-ds-ink-tertiary">Not given</span>}
                  </td>
                  <td className="px-4 py-3"><YesNo value={row.early_tester} /></td>
                  <td className="px-4 py-3"><YesNo value={row.marketing_consent} /></td>
                  <td className="whitespace-nowrap px-4 py-3 font-ds text-ds-body text-ds-ink-secondary">
                    {row.source === "home" ? "Home page" : row.source === "contact" ? "Contact page" : row.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
