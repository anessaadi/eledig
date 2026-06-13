export const site = {
  name: "L'élégance digitale",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '213000000000',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  social: {
    instagram: 'https://instagram.com/elegance.digitale',
    tiktok: 'https://tiktok.com/@elegance.digitale',
    facebook: 'https://facebook.com/elegance.digitale',
  },
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
