import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Only the local placeholder-product.svg is served as SVG; a strict CSP
    // keeps this safe even if a remote source ever returned SVG content.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  typedRoutes: true,
  experimental: {
    // The local zero-install dev database (PGlite, see scripts/pglite-server.mjs,
    // signaled by DB_POOL_MAX being set) only reliably serves one connection
    // at a time — parallel static-generation workers overwhelm it. Real
    // Postgres deployments don't set DB_POOL_MAX and keep full concurrency.
    cpus: process.env.DB_POOL_MAX ? 1 : undefined,
  },
  allowedDevOrigins: ["192.168.31.100", "localhost", "127.0.0.1"],
};

export default nextConfig;
