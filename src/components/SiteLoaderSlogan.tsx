'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const BRAND = {
  orange: '#ff6b35',
  purple: '#c84bff',
  ice: '#00d4ff',
};

const LETTER_STAGGER = 0.035;
const GAP_BETWEEN_WORDS = 0.18;

export default function SiteLoaderSlogan() {
  const t = useTranslations('footer');
  const reduceMotion = useReducedMotion();
  const words = [t('slogan1'), t('slogan2'), t('slogan3')];

  const wordDelays = useMemo(() => {
    const delays: number[] = [];
    let cursor = 0;
    for (const word of words) {
      delays.push(cursor);
      cursor += word.length * LETTER_STAGGER + 0.35 + GAP_BETWEEN_WORDS;
    }
    return delays;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.join('')]);

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
    <div className="relative z-[1] flex flex-col items-center gap-8 sm:gap-12 px-6">
      {words.map((word, i) => {
        const wordDelay = wordDelays[i];
        const letters = word.split('');

        return (
          <div key={`${word}-${i}`} className="relative flex flex-col items-center">
            {/* Mot : les lettres sont toujours dans le flow (espace reservé), animées individuellement */}
            <div className="relative inline-flex">
              {letters.map((letter, li) => (
                <motion.span
                  key={`${word}-${i}-${li}`}
                  className="inline-block font-ethno font-bold leading-none text-4xl sm:text-6xl md:text-7xl gradient-text"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: wordDelay + li * LETTER_STAGGER,
                    duration: 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Ligne gradient */}
            <motion.div
              className="relative mt-5 h-[2px] w-[min(78vw,440px)] overflow-hidden rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${BRAND.ice}22, ${BRAND.purple}28, transparent)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: wordDelay + letters.length * LETTER_STAGGER, duration: 0.12 }}
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
                  delay: wordDelay + letters.length * LETTER_STAGGER + 0.05,
                  duration: 0.55,
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
