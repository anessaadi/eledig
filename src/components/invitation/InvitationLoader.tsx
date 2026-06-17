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
  const [fading, setFading] = useState(false);
  const [overlayGone, setOverlayGone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    function reveal() { if (!cancelled) setReady(true); }

    if (waitFor.length > 0) {
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
      if (loaded >= waitFor.length) { reveal(); return; }
      const timeout = setTimeout(reveal, 4000);
      return () => { cancelled = true; clearTimeout(timeout); void pending; };
    }

    // Fallback: wait for all document images (live invitation path)
    function checkImages() {
      const imgs = Array.from(document.images);
      return imgs.length === 0 || imgs.every((img) => img.complete && img.naturalWidth > 0);
    }
    if (checkImages()) { reveal(); return; }

    const timeout = setTimeout(reveal, 4000);
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
    if (!ready) return;
    // Wait 400ms after ready so the envelope has time to render and paint from cache,
    // then start the fade, then remove from DOM after the transition completes.
    const t1 = setTimeout(() => setFading(true), 400);
    const t2 = setTimeout(() => setOverlayGone(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [ready]);

  return (
    <InvitationReadyContext.Provider value={ready}>
      {children}

      {!overlayGone && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: bg,
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.5s ease-out',
            pointerEvents: fading ? 'none' : 'auto',
          }}
        >
          <style>{`@keyframes _loader-spin { to { transform: rotate(360deg); } }`}</style>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: accent,
            borderRightColor: accent + '44',
            animation: '_loader-spin 0.75s linear infinite',
          }} />
        </div>
      )}
    </InvitationReadyContext.Provider>
  );
}
