import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  isAdminConfigured,
  verifyPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Brute-force throttle. The admin panel exposes personal data, so this is
// stricter than the public signup form: a handful of tries, then a lockout.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const attempts = new Map<string, number[]>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function tooManyAttempts(ip: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 1_000) attempts.clear();
  return recent.length > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "The admin panel is not configured. ADMIN_PASSWORD is not set." },
      { status: 503 },
    );
  }

  if (tooManyAttempts(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait 15 minutes and try again." },
      { status: 429 },
    );
  }

  const raw = await request.text();
  if (raw.length > 1_000) {
    return NextResponse.json({ error: "Invalid request." }, { status: 413 });
  }

  let password = "";
  try {
    password = String((JSON.parse(raw) as { password?: unknown }).password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    // Deliberately vague: no hint about whether the password was close.
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = createSessionToken();
  if (!token) {
    return NextResponse.json({ error: "The admin panel is not configured." }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
