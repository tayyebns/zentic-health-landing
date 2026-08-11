import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { normaliseSignup, validateSignup, type SignupPayload } from "@/lib/signup";

// Needs the Node runtime for the local dev file fallback below.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const MAX_BODY_BYTES = 4_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// Best-effort, per-instance throttle. Serverless instances are ephemeral so
// this is a speed bump against casual abuse, not a hard guarantee — the real
// backstop is the unique email constraint, which makes replays idempotent.
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5_000) hits.clear(); // crude guard against unbounded growth

  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

type SignupRow = ReturnType<typeof normaliseSignup>;

async function saveToSupabase(row: SignupRow) {
  // PostgREST upsert: a repeat signup updates the existing row instead of
  // failing on the unique email constraint.
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/signups?on_conflict=email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_ROLE_KEY as string,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(row),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase responded ${response.status}: ${detail}`);
  }
}

// Local-development escape hatch so the form is testable before Supabase
// credentials exist. Never used in production — see the guard in POST.
async function saveToLocalFile(row: SignupRow) {
  const file = path.join(process.cwd(), ".data", "signups.json");
  await fs.mkdir(path.dirname(file), { recursive: true });

  let existing: unknown[] = [];
  try {
    existing = JSON.parse(await fs.readFile(file, "utf8"));
    if (!Array.isArray(existing)) existing = [];
  } catch {
    // First write, or an unreadable file: start a fresh list.
  }

  const deduped = existing.filter(
    (entry) => (entry as SignupRow)?.email !== row.email,
  );
  deduped.push({ ...row, created_at: new Date().toISOString() });

  await fs.writeFile(file, `${JSON.stringify(deduped, null, 2)}\n`, "utf8");
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again shortly." },
      { status: 429 },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Submission too large." }, { status: 413 });
  }

  let body: Partial<SignupPayload>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot. Bots fill every field they find; the input is hidden from both
  // sighted users and screen readers. Report success so they stop retrying.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const errors = validateSignup(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const row = normaliseSignup(body);

  try {
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      await saveToSupabase(row);
    } else if (process.env.NODE_ENV !== "production") {
      await saveToLocalFile(row);
      console.info("[signup] Supabase not configured — saved to .data/signups.json");
    } else {
      throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set");
    }
  } catch (error) {
    console.error("[signup] Failed to store submission:", error);
    return NextResponse.json(
      { error: "Something went wrong saving your details. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
