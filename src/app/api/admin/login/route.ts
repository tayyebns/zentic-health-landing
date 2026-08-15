import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  MIN_ADMIN_PASSWORD_LENGTH,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  isAdminConfigured,
  verifyPassword,
} from "@/lib/admin-auth";
import {
  checkLoginThrottle,
  clearLoginFailures,
  recordLoginFailure,
  throttleSource,
} from "@/lib/admin-throttle";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function throttled(retryAfter: number) {
  return NextResponse.json(
    { error: "Too many attempts. Please wait and try again." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      {
        error: `The admin panel is not configured. ADMIN_PASSWORD must be set and at least ${MIN_ADMIN_PASSWORD_LENGTH} characters.`,
      },
      { status: 503 },
    );
  }

  const source = throttleSource(request);
  const verdict = checkLoginThrottle(source);
  if (verdict.limited) return throttled(verdict.retryAfter);

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
    recordLoginFailure(source);
    // Deliberately vague: no hint about whether the password was close.
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  clearLoginFailures(source);

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
