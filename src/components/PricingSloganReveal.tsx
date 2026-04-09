'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const BRAND = {
  orange: '#ff6b35',
  purple: '#c84bff',
  ice: '#00d4ff',
};

const BEAT = 0.62;
const LAND = { type: 'spring' as const, stiffness: 220, damping: 22, mass: 0.65 };

export default function PricingSloganReveal() {
  const t = useTranslations('footer');
  const reduceMotion = useReducedMotion();
  const words = [t('slogan1'), t('slogan2'), t('slogan3')];

  if (reduceMotion) {
    return (
      <div className="flex flex-col items-center gap-5 px-6 text-center font-ethno font-bold text-3xl sm:text-5xl gradient-text">
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>{w}</span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative z-[1] flex flex-col items-center justify-center gap-8 sm:gap-12 px-6">
      {words.map((word, i) => {
        const delay = i * BEAT;

        return (
          <div key={`${word}-${i}`} className="relative flex flex-col items-center">
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay * 0.12, duration: 0.15 }}
            >
              <motion.span
                className="relative block font-ethno font-bold leading-none text-4xl sm:text-6xl md:text-7xl gradient-text"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay,
                  opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  y: { ...LAND, delay },
                }}
              >
                {word}
              </motion.span>
            </motion.div>

            <motion.div
              className="relative mt-5 h-[2px] w-[min(78vw,440px)] overflow-hidden rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${BRAND.ice}22, ${BRAND.purple}28, transparent)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.12, duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-center rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${BRAND.orange}, ${BRAND.purple}, ${BRAND.ice}, transparent)`,
                  boxShadow: `0 0 12px ${BRAND.purple}44`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  delay: delay + 0.22,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
