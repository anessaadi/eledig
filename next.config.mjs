import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/', destination: '/ar', permanent: false },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // When you host template images on a CDN (Supabase Storage / Vercel Blob),
    // add the host here, e.g.:
    // remotePatterns: [{ protocol: 'https', hostname: 'xxxx.supabase.co' }],
    remotePatterns: [
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      { protocol: 'http',  hostname: 'localhost' },
    ],
  },
};

export default withNextIntl(nextConfig);
