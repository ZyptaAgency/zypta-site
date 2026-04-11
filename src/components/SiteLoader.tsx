'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import SiteLoaderSlogan from './SiteLoaderSlogan';

export type SiteLoaderReplay = { id: number; onComplete?: () => void } | null;

interface SiteLoaderProps {
  replayRequest: SiteLoaderReplay;
  onReplayConsumed: () => void;
  duration?: number;
  onlyFirstVisit?: boolean;
}

type Phase = 'logo' | 'slogan' | 'done';

const PHASE_LOGO = 1800;
const PHASE_SLOGAN = 2800;
const TOTAL = PHASE_LOGO + PHASE_SLOGAN;

export default function SiteLoader({
  replayRequest,
  onReplayConsumed,
  duration = TOTAL,
  onlyFirstVisit = true,
}: SiteLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>('logo');
  const firstVisitScheduled = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const startSequence = useCallback(
    (onComplete?: () => void) => {
      clearTimers();
      setPhase('logo');
      setVisible(true);
      document.body.style.overflow = 'hidden';

      timers.current.push(
        window.setTimeout(() => setPhase('slogan'), PHASE_LOGO),
      );
      timers.current.push(
        window.setTimeout(() => {
          setVisible(false);
          setPhase('done');
          document.body.style.overflow = '';
          onComplete?.();
        }, duration),
      );
    },
    [clearTimers, duration],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || firstVisitScheduled.current) return;

    if (onlyFirstVisit && typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('zypta-loader-seen');
      if (seen) {
        firstVisitScheduled.current = true;
        return;
      }
      sessionStorage.setItem('zypta-loader-seen', '1');
    }

    firstVisitScheduled.current = true;
    startSequence();

    return () => {
      clearTimers();
      document.body.style.overflow = '';
    };
  }, [mounted, onlyFirstVisit, startSequence, clearTimers]);

  useEffect(() => {
    if (!replayRequest) return;

    startSequence(() => {
      replayRequest.onComplete?.();
      onReplayConsumed();
    });

    return () => {
      clearTimers();
      document.body.style.overflow = '';
    };
  }, [replayRequest, startSequence, onReplayConsumed, clearTimers]);

  if (!mounted) return null;

  const isSloganPhase = phase === 'slogan';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'var(--bg-void)',
            boxShadow: 'inset 0 0 120px rgba(0,0,0,0.85)',
          }}
          aria-busy="true"
          aria-label="Chargement"
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_50%,rgba(200,75,255,0.04)_0%,transparent_72%)]"
            aria-hidden
          />

          {/* ── Phase 1 : Logo supernova + chargement ── */}
          <AnimatePresence>
            {phase === 'logo' && (
              <motion.div
                className="relative z-10 flex flex-col items-center gap-5"
                exit={{
                  scale: 1.3,
                  opacity: 0,
                  filter: 'blur(20px)',
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Logo src="/icon.png" width={140} height={140} />
                </motion.div>

                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-ethno text-5xl sm:text-6xl md:text-7xl gradient-text tracking-tight leading-none"
                >
                  ZYPTA
                </motion.span>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
                  className="h-0.5 w-48 sm:w-56 origin-center"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(200,75,255,0.9), rgba(0,212,255,0.6), transparent)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Phase 2 : Zip. Build. Launch. lettre par lettre ── */}
          <AnimatePresence>
            {isSloganPhase && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.25, ease: 'easeOut' }}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                <SiteLoaderSlogan />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
