'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Props = {
  delayChildren?: number;
  staggerChildren?: number;
  wordClassName?: string;
  className?: string;
};

export function AnimatedSloganWords({
  delayChildren = 0.45,
  staggerChildren = 0.34,
  wordClassName = 'text-lg sm:text-2xl lg:text-3xl',
  className = '',
}: Props) {
  const t = useTranslations('footer');
  const words = [t('slogan1'), t('slogan2'), t('slogan3')];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delayChildren, staggerChildren, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const wordVariant = {
    hidden: {
      opacity: 0,
      y: 44,
      filter: 'blur(16px)',
      scale: 0.82,
      rotateX: 26,
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.88, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className={`relative [perspective:900px] ${className}`}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-10 gap-y-3 text-center font-ethno font-bold"
        aria-label={`${t('slogan1')} ${t('slogan2')} ${t('slogan3')}`}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariant}
            style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 85%' }}
            className={`inline-block gradient-text [text-shadow:0_0_40px_rgba(200,75,255,0.35),0_0_80px_rgba(0,212,255,0.12)] ${wordClassName}`}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
