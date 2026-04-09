'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function PricingRouteLoader() {
  const t = useTranslations('footer');
  const words = [t('slogan1'), t('slogan2'), t('slogan3')];

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-void)' }}
      aria-busy="true"
      aria-label={`${t('slogan1')} ${t('slogan2')} ${t('slogan3')}`}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,700px)] h-[min(90vw,700px)] rounded-full blur-3xl pointer-events-none opacity-50"
        style={{
          background:
            'radial-gradient(circle, rgba(200,75,255,0.25) 0%, rgba(255,107,53,0.12) 45%, rgba(0,212,255,0.1) 70%, transparent 75%)',
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.18, delayChildren: 0.08 },
          },
        }}
        className="relative flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 text-center font-ethno font-bold px-6"
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
    </div>
  );
}
