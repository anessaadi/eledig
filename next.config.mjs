import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // When you host template images on a CDN (Supabase Storage / Vercel Blob),
    // add the host here, e.g.:
    // remotePatterns: [{ protocol: 'https', hostname: 'xxxx.supabase.co' }],
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
