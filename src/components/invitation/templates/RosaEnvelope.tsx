'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function RosaEnvelope({
  upSrc = '/templates/rosa/upburgundyrosa.webp',
  downSrc = '/templates/rosa/downburgundyrosa.webp',
}: {
  upSrc?: string;
  downSrc?: string;
}) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1700);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Down panel — behind */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 50, animation: 'envelope-down 1s ease-in-out 1s both' }}
      >
        <Image src={downSrc} alt="" fill className="object-cover" priority />
      </div>
      {/* Up panel — on top */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 51, animation: 'envelope-up 1s ease-in-out 1s both' }}
      >
        <Image src={upSrc} alt="" fill className="object-cover" priority />
      </div>
    </div>
  );
}
