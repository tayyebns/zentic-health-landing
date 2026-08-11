import { promises as fs } from "node:fs";
import path from "node:path";

export interface SignupRecord {
  id?: string;
  created_at?: string;
  updated_at?: string;
  first_name: string;
  last_name: string;
  email: string;
  interest: string | null;
  early_tester: boolean | null;
  marketing_consent: boolean;
  source: string;
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Reads every signup, newest first. Server-only: the service role key must
 * never reach the browser, so this is called from server components and route
 * handlers exclusively.
 */
export async function listSignups(): Promise<SignupRecord[]> {
  if (isSupabaseConfigured()) {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/signups?select=*&order=created_at.desc`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_ROLE_KEY as string,
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Supabase responded ${response.status}: ${await response.text()}`);
    }

    return (await response.json()) as SignupRecord[];
  }

  // Local development fallback, mirroring the write path in /api/signup.
  try {
    const file = path.join(process.cwd(), ".data", "signups.json");
    const rows = JSON.parse(await fs.readFile(file, "utf8")) as SignupRecord[];
    if (!Array.isArray(rows)) return [];
    return rows.sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));
  } catch {
    return [];
  }
}
