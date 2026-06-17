'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useInvitationReady } from '@/components/invitation/InvitationReadyContext';

export default function KabyleEnvelope({
  upSrc = '/templates/kabyle/upbeige.webp',
  downSrc = '/templates/kabyle/downbeige.webp',
}: {
  upSrc?: string;
  downSrc?: string;
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
      <div className="absolute inset-0" style={{ zIndex: 50, animation: started ? 'envelope-down 1.5s ease-in-out 0s both' : 'none' }}>
        <Image src={downSrc} alt="" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0" style={{ zIndex: 51, animation: started ? 'envelope-up 1.5s ease-in-out 0s both' : 'none' }}>
        <Image src={upSrc} alt="" fill className="object-cover" priority />
      </div>
    </div>
  );
}
