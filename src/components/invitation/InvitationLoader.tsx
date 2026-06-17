'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { InvitationReadyContext } from './InvitationReadyContext';

export default function InvitationLoader({
  children,
  bg = '#f6f2ec',
  accent = '#c9a055',
  waitFor = [],
}: {
  children: ReactNode;
  bg?: string;
  accent?: string;
  /** Specific image URLs to wait for. If provided, only these are tracked. */
  waitFor?: string[];
}) {
  const [ready, setReady] = useState(false);
  const [overlayGone, setOverlayGone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    function reveal() { if (!cancelled) setReady(true); }

    if (waitFor.length > 0) {
      // Only wait for the specific envelope images
      let loaded = 0;
      const pending = waitFor.map((src) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loaded++;
          if (loaded >= waitFor.length) reveal();
        };
        img.src = src;
        return img;
      });
      // If all already cached, complete will fire synchronously before this runs
      if (loaded >= waitFor.length) { reveal(); return; }
      const timeout = setTimeout(reveal, 3000);
      return () => { cancelled = true; clearTimeout(timeout); void pending; };
    }

    // Fallback: wait for all document images (live invitation path)
    function checkImages() {
      const imgs = Array.from(document.images);
      return imgs.length === 0 || imgs.every((img) => img.complete && img.naturalWidth > 0);
    }
    if (checkImages()) { reveal(); return; }

    const timeout = setTimeout(reveal, 3000);
    const imgs = Array.from(document.images).filter((img) => !img.complete);
    if (imgs.length === 0) { reveal(); clearTimeout(timeout); return; }

    let loaded = 0;
    function onLoad() { loaded++; if (loaded >= imgs.length) { clearTimeout(timeout); reveal(); } }
    imgs.forEach((img) => {
      img.addEventListener('load', onLoad, { once: true });
      img.addEventListener('error', onLoad, { once: true });
    });
    return () => { cancelled = true; clearTimeout(timeout); };
  }, []);

  useEffect(() => {
    if (ready) {
      const t = setTimeout(() => setOverlayGone(true), 600);
      return () => clearTimeout(t);
    }
  }, [ready]);

  return (
    <InvitationReadyContext.Provider value={ready}>
      {children}

      {!overlayGone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: bg,
            opacity: ready ? 0 : 1,
            transition: 'opacity 0.5s ease-out',
            pointerEvents: ready ? 'none' : 'auto',
          }}
        >
          <div
            className="h-10 w-10 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: accent, borderRightColor: accent + '44' }}
          />
        </div>
      )}
    </InvitationReadyContext.Provider>
  );
}
