import type { ReactNode } from 'react';
import '../../globals.css';

export const metadata = {
  title: 'Connexion — Admin',
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
