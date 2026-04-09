'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

/** Même palette que `.gradient-text` (logo ZYPTA) : #ff6b35 → #c84bff → #00d4ff */
const BRAND = {
  orange: '#ff6b35',
  purple: '#c84bff',
  ice: '#00d4ff',
};

const BEAT = 0.62;
const LAND = { type: 'spring' as const, stiffness: 200, damping: 18, mass: 0.72 };

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
    <div className="relative z-[1] flex flex-col items-center justify-center gap-8 sm:gap-12 px-6 [perspective:1400px]">
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
                aria-hidden
                className="pointer-events-none absolute inset-0 font-ethno font-bold leading-none text-4xl sm:text-6xl md:text-7xl blur-[0.9px] select-none"
                style={{
                  color: BRAND.ice,
                  opacity: 0.22,
                  transform: 'translate(-4px, 1px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.45, 0.16] }}
                transition={{
                  delay: delay + 0.04,
                  duration: 0.8,
                  times: [0, 0.4, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 font-ethno font-bold leading-none text-4xl sm:text-6xl md:text-7xl blur-[0.9px] select-none"
                style={{
                  color: BRAND.orange,
                  opacity: 0.22,
                  transform: 'translate(5px, -1px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.45, 0.16] }}
                transition={{
                  delay: delay + 0.04,
                  duration: 0.8,
                  times: [0, 0.4, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>

              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 font-ethno font-bold leading-none text-4xl sm:text-6xl md:text-7xl text-white/[0.06] blur-2xl select-none"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: [0, 0.75, 0.22],
                  scale: [0.85, 1.35, 1.02],
                }}
                transition={{
                  delay: delay + 0.1,
                  duration: 0.78,
                  times: [0, 0.45, 1],
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>

              <motion.span
                className="relative block font-ethno font-bold leading-none text-4xl sm:text-6xl md:text-7xl gradient-text"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: '50% 100%',
                }}
                initial={{
                  opacity: 0,
                  y: 80,
                  rotateX: 64,
                  scale: 0.65,
                  filter: 'blur(30px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{
                  delay,
                  opacity: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                  y: { ...LAND, delay },
                  rotateX: { ...LAND, delay },
                  scale: { ...LAND, delay },
                  filter: { duration: 1.05, delay, ease: [0.06, 0.88, 0.1, 1] },
                }}
              >
                {word}
              </motion.span>

              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 font-ethno font-bold leading-none text-4xl sm:text-6xl md:text-7xl text-transparent select-none"
                style={{
                  WebkitTextStroke: '1px rgba(200,75,255,0.22)',
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0, 0.12, 0.05, 0.14, 0.06],
                }}
                transition={{
                  delay: 1.55 + i * 0.22,
                  duration: 3.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
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
                  boxShadow: `0 0 22px ${BRAND.purple}66, 0 0 40px ${BRAND.ice}44`,
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

            <motion.div
              className="pointer-events-none absolute -inset-10 rounded-[2rem] sm:-inset-14"
              style={{
                background: `radial-gradient(ellipse 75% 55% at 50% 45%, ${BRAND.purple}14 0%, transparent 62%)`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.85, 0.26],
              }}
              transition={{
                delay: delay + 0.15,
                duration: 1.12,
                times: [0, 0.32, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        );
      })}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.042] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
