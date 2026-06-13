'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

// Layer 1 (envelope) sits on top of Layer 2 (the invitation). Tap to open.
export default function EnvelopeReveal({
  children,
  openLabel,
  bg = '#f6f2ec',
  accent = '#c8b08a',
  ink = '#2f2a26',
}: {
  children: ReactNode;
  openLabel: string;
  bg?: string;
  accent?: string;
  ink?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Layer 2 — the invitation underneath */}
      <div className="min-h-screen w-full">{children}</div>

      {/* Layer 1 — the envelope cover */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="absolute inset-0 z-20 grid place-items-center"
            style={{ background: bg }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <motion.button
              onClick={() => setOpen(true)}
              className="group relative flex flex-col items-center gap-6"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* envelope */}
              <div className="relative h-44 w-72 rounded-md shadow-2xl"
                   style={{ background: ink }}>
                {/* body lines */}
                <div className="absolute inset-x-6 bottom-6 space-y-2 opacity-30">
                  <div className="h-px" style={{ background: bg }} />
                  <div className="h-px w-2/3" style={{ background: bg }} />
                </div>
                {/* wax seal */}
                <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-sm shadow-lg"
                     style={{ background: bg, color: ink }}>
                  É
                </div>
                {/* flap */}
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top"
                  style={{
                    height: '50%',
                    background: accent,
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }}
                  initial={{ rotateX: 0 }}
                  whileHover={{ rotateX: -25 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="rounded-full border px-7 py-3 text-sm uppercase tracking-[0.25em]"
                    style={{ borderColor: accent, color: ink }}>
                {openLabel}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
