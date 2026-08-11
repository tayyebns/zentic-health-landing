import { createHmac, timingSafeEqual } from "node:crypto";

// The admin password lives only in ADMIN_PASSWORD (server-side env var). It is
// never bundled into client JS and never committed — the repo is public.
//
// Sessions are a signed cookie rather than a stored session table: there is one
// admin user, so there is nothing to look up. The signing key is derived from
// the password itself, which means changing the password immediately
// invalidates every existing session, and keeps deployment down to one env var.

export const ADMIN_COOKIE = "zentic_admin";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

const KEY_SALT = "zentic-admin-session-v1";

function adminPassword(): string | undefined {
  const value = process.env.ADMIN_PASSWORD;
  return value && value.length > 0 ? value : undefined;
}

export function isAdminConfigured(): boolean {
  return adminPassword() !== undefined;
}

function signingKey(password: string): Buffer {
  return createHmac("sha256", KEY_SALT).update(password).digest();
}

function sign(payload: string, password: string): string {
  return createHmac("sha256", signingKey(password)).update(payload).digest("base64url");
}

/** Constant-time string compare that does not leak length via early return. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  // Hash both sides first so differing lengths do not throw and do not leak.
  const hashA = createHmac("sha256", KEY_SALT).update(bufA).digest();
  const hashB = createHmac("sha256", KEY_SALT).update(bufB).digest();
  return timingSafeEqual(hashA, hashB);
}

export function verifyPassword(candidate: string): boolean {
  const password = adminPassword();
  if (!password) return false;
  return safeEqual(candidate, password);
}

export function createSessionToken(): string | null {
  const password = adminPassword();
  if (!password) return null;

  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload, password)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  const password = adminPassword();
  if (!password || !token) return false;

  const separator = token.lastIndexOf(".");
  if (separator === -1) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  if (!safeEqual(signature, sign(payload, password))) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}
