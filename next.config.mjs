/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicit, even though false is already the default: no source maps in
  // the client bundle shipped to browsers.
  productionBrowserSourceMaps: false,
};

export default nextConfig;
