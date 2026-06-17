'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInvitationReady } from '@/components/invitation/InvitationReadyContext';

export default function IslamicEnvelope({
  leftSrc = '/templates/islamic/left002.webp',
  rightSrc = '/templates/islamic/right002.webp',
}: {
  leftSrc?: string;
  rightSrc?: string;
}) {
  const ready = useInvitationReady();
  const [started, setStarted] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const t1 = setTimeout(() => setStarted(true), 1200);
    const t2 = setTimeout(() => setGone(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [ready]);

  if (gone) return null;
  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <div className="absolute inset-0" style={{ zIndex: 50, animation: started ? 'envelope-right 1.5s ease-in-out 0s both' : 'none' }}>
        <Image src={rightSrc} alt="" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0" style={{ zIndex: 51, animation: started ? 'envelope-left 1.5s ease-in-out 0s both' : 'none' }}>
        <Image src={leftSrc} alt="" fill className="object-cover" priority />
      </div>
    </div>
  );
}
