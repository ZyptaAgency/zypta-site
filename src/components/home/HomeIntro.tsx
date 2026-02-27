'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '../AnimatedSection';
import { Link } from '@/i18n/routing';

export default function HomeIntro() {
  const t = useTranslations('homeIntro');

  return (
    <section className="relative z-10 py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-white mb-8">
            {t('title')}
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.05}>
          <p className="text-text-muted text-base md:text-lg leading-relaxed mb-6">
            {t('p1')}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <p className="text-text-muted text-base md:text-lg leading-relaxed mb-6">
            {t('p2')}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <p className="text-text-muted text-base md:text-lg leading-relaxed mb-8">
            {t('p3')}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="text-center">
          <Link href="/services" className="btn-outline">
            {t('cta')}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
