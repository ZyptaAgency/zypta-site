'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { AnimatedSloganWords } from './AnimatedSloganWords';

export type SiteLoaderReplay = { id: number; onComplete?: () => void } | null;

interface SiteLoaderProps {
  replayRequest: SiteLoaderReplay;
  onReplayConsumed: () => void;
  duration?: number;
  onlyFirstVisit?: boolean;
}

export default function SiteLoader({
  replayRequest,
  onReplayConsumed,
  duration = 3600,
  onlyFirstVisit = true,
}: SiteLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const firstVisitScheduled = useRef(false);

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
    setVisible(true);
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, duration);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [mounted, duration, onlyFirstVisit]);

  useEffect(() => {
    if (!replayRequest) return;

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      replayRequest.onComplete?.();
      onReplayConsumed();
    }, duration);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [replayRequest, duration, onReplayConsumed]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden px-6"
          style={{ background: 'var(--bg-void)' }}
          aria-busy="true"
          aria-label="Chargement"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,700px)] h-[min(90vw,700px)] rounded-full blur-3xl pointer-events-none opacity-50"
            style={{
              background:
                'radial-gradient(circle, rgba(200,75,255,0.25) 0%, rgba(255,107,53,0.12) 45%, rgba(0,212,255,0.1) 70%, transparent 75%)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-10 sm:mb-12 flex flex-col items-center gap-4"
          >
            <Logo src="/z-mask.png" width={96} height={96} />
            <span className="font-ethno text-4xl sm:text-5xl md:text-6xl gradient-text tracking-tight leading-none">
              ZYPTA
            </span>
            <div className="absolute -bottom-4 left-0 right-0 flex justify-center pointer-events-none">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                className="h-0.5 w-48 sm:w-56 origin-center"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(200,75,255,0.9), rgba(0,212,255,0.6), transparent)',
                }}
              />
            </div>
          </motion.div>

          <AnimatedSloganWords
            delayChildren={0.85}
            staggerChildren={0.36}
            wordClassName="text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-0.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{
                duration: Math.max(0.65, duration / 1000 - 0.4),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full w-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #c84bff, #ff2d8f, #00d4ff)' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
