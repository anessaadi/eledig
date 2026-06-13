'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GoldenEnvelope({
  leftSrc = '/templates/golden/left002.webp',
  rightSrc = '/templates/golden/right002.webp',
}: {
  leftSrc?: string;
  rightSrc?: string;
}) {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1700);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{ zIndex: 50, animation: 'envelope-right 1s ease-in-out 1s both' }}>
        <Image src={rightSrc} alt="" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0" style={{ zIndex: 51, animation: 'envelope-left 1s ease-in-out 1s both' }}>
        <Image src={leftSrc} alt="" fill className="object-cover" priority />
      </div>
    </div>
  );
}
