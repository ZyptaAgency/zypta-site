'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Logo from './Logo';

interface SiteLoaderProps {
  duration?: number;
  onlyFirstVisit?: boolean;
}

export default function SiteLoader({ duration = 2400, onlyFirstVisit = true }: SiteLoaderProps) {
  const t = useTranslations('footer');
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (onlyFirstVisit && typeof window !== 'undefined') {
      const seen = sessionStorage.getItem('zypta-loader-seen');
      if (seen) {
        return;
      }
      sessionStorage.setItem('zypta-loader-seen', '1');
    }

    setVisible(true);
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [duration, onlyFirstVisit]);

  if (!mounted) return null;

  const words = [t('slogan1'), t('slogan2'), t('slogan3')];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
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
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-10 flex flex-col items-center gap-3"
          >
            <Logo src="/icon.png" width={56} height={56} />
            <span className="font-ethno text-3xl sm:text-4xl gradient-text tracking-[0.25em]">ZYPTA</span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.55, ease: 'easeOut' }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 h-0.5 origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(200,75,255,0.9), rgba(0,212,255,0.6), transparent)',
              }}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.18, delayChildren: 0.55 },
              },
            }}
            className="relative flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 text-center font-ethno font-bold"
            aria-label={`${t('slogan1')} ${t('slogan2')} ${t('slogan3')}`}
          >
            {words.map((word) => (
              <motion.span
                key={word}
                variants={{
                  hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
                  show: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="inline-block gradient-text text-2xl sm:text-4xl lg:text-5xl"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

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
                duration: Math.max(0.6, duration / 1000 - 0.35),
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
