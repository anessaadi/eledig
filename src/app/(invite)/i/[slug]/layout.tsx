import type { Metadata } from 'next';
import '../../../globals.css';
import { playfair, cormorant, zain, elMessiri, komediaBlack } from '@/app/fonts';

// Invitations should never be indexed by search engines.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Invitation',
};

export default function InvitationLayout({ children }: { children: React.ReactNode }) {
  const fontVars = `${playfair.variable} ${cormorant.variable} ${zain.variable} ${elMessiri.variable} ${komediaBlack.variable}`;
  return (
    <html lang="Français">
      <body className={fontVars}>{children}</body>
    </html>
  );
}
