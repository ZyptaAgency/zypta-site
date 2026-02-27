'use client';

import { useTranslations } from 'next-intl';
import AnimatedSection from '../AnimatedSection';

export default function PrivacyContent() {
  const t = useTranslations('privacy');

  const sections = [
    { titleKey: 'collectTitle' as const, textKey: 'collectText' as const },
    { titleKey: 'cookiesTitle' as const, textKey: 'cookiesText' as const },
    { titleKey: 'rightsTitle' as const, textKey: 'rightsText' as const },
    { titleKey: 'contactTitle' as const, textKey: 'contactText' as const },
  ];

  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      <div
        className="nebula-orb w-[500px] h-[500px] top-[5%] left-[-10%]"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-6">
            {t('title')}
          </h1>
          <p className="text-text-muted leading-relaxed">
            {t('intro')}
          </p>
        </AnimatedSection>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <AnimatedSection key={section.titleKey} delay={i * 0.05}>
              <div className="glass-card p-6 md:p-8">
                <h2 className="font-display text-xl font-semibold text-text-white mb-4">
                  {t(section.titleKey)}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t(section.textKey)}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
