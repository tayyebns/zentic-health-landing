import type { NextRequest } from "next/server";

// Brute-force throttle for the admin login endpoint, which guards a panel of
// signup PII.
//
// Two rules apply, and both must pass:
//
//   1. Per-source: a handful of failures from one source, then a lockout.
//   2. Global: a hard ceiling on failed logins across every source. There is
//      exactly one admin, so a legitimate person never needs more than a few
//      tries. The ceiling is what makes the throttle useful even when the
//      request source cannot be attributed — an attacker rotating source
//      addresses still runs into it.
//
// The counters live in memory, so they are per-instance and reset on cold
// start. The global ceiling is deliberately low enough that even a large fleet
// of instances leaves the total guess rate far below anything useful against a
// high-entropy password (see MIN_ADMIN_PASSWORD_LENGTH in admin-auth).

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_SOURCE = 5;
const MAX_FAILURES_GLOBAL = 15;
const MAX_TRACKED_SOURCES = 1_000;

const failuresBySource = new Map<string, number[]>();
let globalFailures: number[] = [];

function prune(timestamps: number[], now: number): number[] {
  return timestamps.filter((t) => now - t < WINDOW_MS);
}

/**
 * Rate-limit key for the request.
 *
 * Only platform-set values are trusted. `x-forwarded-for` and `x-real-ip` are
 * set by the client on a direct connection, so keying on them lets an attacker
 * mint a fresh counter per request. When no trustworthy source is available
 * every request shares the `unattributed` bucket, which is strict rather than
 * permissive: the global ceiling then does the work.
 */
export function throttleSource(request: NextRequest): string {
  // Populated by Vercel's edge network from the real connection.
  const platformIp =
    request.ip ??
    (process.env.VERCEL
      ? request.headers.get("x-vercel-forwarded-for")?.split(",").pop()?.trim()
      : undefined);

  return platformIp && platformIp.length > 0 ? platformIp : "unattributed";
}

/** Seconds until the oldest failure in `timestamps` leaves the window. */
function retryAfterSeconds(timestamps: number[], now: number): number {
  const oldest = timestamps[0];
  if (oldest === undefined) return Math.ceil(WINDOW_MS / 1000);
  return Math.max(1, Math.ceil((WINDOW_MS - (now - oldest)) / 1000));
}

export type ThrottleVerdict = { limited: false } | { limited: true; retryAfter: number };

/** Read-only check: does this request already exceed a failure budget? */
export function checkLoginThrottle(source: string): ThrottleVerdict {
  const now = Date.now();

  globalFailures = prune(globalFailures, now);
  if (globalFailures.length >= MAX_FAILURES_GLOBAL) {
    return { limited: true, retryAfter: retryAfterSeconds(globalFailures, now) };
  }

  const forSource = prune(failuresBySource.get(source) ?? [], now);
  if (forSource.length >= MAX_FAILURES_PER_SOURCE) {
    return { limited: true, retryAfter: retryAfterSeconds(forSource, now) };
  }

  return { limited: false };
}

/** Record a failed login. Only failures count, so valid logins are never throttled away. */
export function recordLoginFailure(source: string): void {
  const now = Date.now();

  globalFailures = prune(globalFailures, now);
  globalFailures.push(now);

  const forSource = prune(failuresBySource.get(source) ?? [], now);
  forSource.push(now);
  failuresBySource.set(source, forSource);

  if (failuresBySource.size > MAX_TRACKED_SOURCES) {
    // Evict expired entries, oldest first, rather than clearing the map: a
    // blanket clear is itself a bypass, since filling the map resets every
    // counter. The global ceiling still bounds anyone who outruns eviction.
    const byAge = Array.from(failuresBySource.entries()).sort(
      (a, b) => (a[1][0] ?? 0) - (b[1][0] ?? 0),
    );
    for (const [key, times] of byAge) {
      if (failuresBySource.size <= MAX_TRACKED_SOURCES) break;
      if (prune(times, now).length === 0) failuresBySource.delete(key);
    }
  }
}

/** Clear a source's failures after a successful login. */
export function clearLoginFailures(source: string): void {
  failuresBySource.delete(source);
}
