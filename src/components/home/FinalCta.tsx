'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import AnimatedSection from '../AnimatedSection';

export default function FinalCta() {
  const t = useTranslations('finalCta');

  return (
    <section className="relative z-10 py-32 px-6 overflow-hidden">
      {/* Nebula background */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="nebula-orb w-[700px] h-[700px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.25) 0%, rgba(200,75,255,0.15) 40%, transparent 70%)' }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <AnimatedSection>
          <h2 className="font-display text-4xl md:text-6xl font-bold gradient-text mb-6">
            {t('headline')}
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <p className="text-text-muted text-lg md:text-xl mb-10">
            {t('sub')}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <Link href="/contact" className="btn-primary text-base">
            {t('cta')}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
