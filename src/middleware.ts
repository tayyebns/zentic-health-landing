import { NextResponse } from "next/server";

// Nonce/strict-dynamic was tried here and reverted: Next.js does not add a
// `nonce` attribute to its own chunk <script> tags or hydration payload
// scripts in this project's setup, so 'strict-dynamic' blocked the entire
// framework runtime (verified against a production build, not just dev).
// This policy instead relies on 'self' for same-origin scripts/styles and
// 'unsafe-inline' for Next's inline hydration payload. There are no custom
// inline <script> tags anywhere in this codebase, and the only user input on
// the site (the signup form) is posted to a same-origin API route and never
// rendered back into the page as markup, so the realistic residual risk from
// 'unsafe-inline' here is low. Revisit if custom scripts are ever added.
//
// 'form-action' and 'connect-src' both stay at 'self': the signup form submits
// via fetch() to /api/signup on this origin.
export function middleware() {
  const isDev = process.env.NODE_ENV !== "production";

  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    font-src 'self';
    connect-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `
    .replace(/\s{2,}/g, " ")
    .trim();

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
