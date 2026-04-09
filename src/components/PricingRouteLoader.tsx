'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import PricingSloganReveal from './PricingSloganReveal';

export default function PricingRouteLoader() {
  const t = useTranslations('footer');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'var(--bg-void)',
        boxShadow: 'inset 0 0 120px rgba(0,0,0,0.85)',
      }}
      aria-busy="true"
      aria-label={`${t('slogan1')} ${t('slogan2')} ${t('slogan3')}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_50%_50%,rgba(200,75,255,0.04)_0%,transparent_72%)]"
        aria-hidden
      />
      <PricingSloganReveal />
    </motion.div>
  );
}
