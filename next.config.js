const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

let webhookOrigin = '';
if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL) {
  try {
    webhookOrigin = new URL(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL).origin;
  } catch (e) {}
}

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://checkout.razorpay.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://checkout.razorpay.com;
  font-src 'self' data:;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.razorpay.com ${webhookOrigin};
  frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com;
  frame-ancestors 'self';
  require-trusted-types-for 'script';
  trusted-types default nextjs nextjs#bundler;
  object-src 'none';
  base-uri 'self';
`.replace(/\s{2,}/g, ' ').trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // output: 'export', // Disabled to allow API routes
    images: {},
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: cspHeader,
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=86400; includeSubDomains',
            },
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',
            },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(), geolocation=()',
            },
          ],
        },
      ];
    },
}

module.exports = withBundleAnalyzer(nextConfig)
