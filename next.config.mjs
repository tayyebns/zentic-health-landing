/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicit, even though false is already the default: no source maps in
  // the client bundle shipped to browsers.
  productionBrowserSourceMaps: false,

  // Static security headers. Content-Security-Policy is intentionally NOT
  // set here: it needs a per-request nonce (to allow Next.js's own
  // hydration scripts while still blocking injected/tampered scripts),
  // which this static config can't provide. That header is set dynamically
  // in src/middleware.ts instead.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
