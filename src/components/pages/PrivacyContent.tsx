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

  const essentialCookies = [
    { nameKey: 'essentialCookie1Name' as const, purposeKey: 'essentialCookie1Purpose' as const, durationKey: 'essentialCookie1Duration' as const },
    { nameKey: 'essentialCookie2Name' as const, purposeKey: 'essentialCookie2Purpose' as const, durationKey: 'essentialCookie2Duration' as const },
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
                {section.titleKey === 'cookiesTitle' && (
                  <div className="mt-6">
                    <h3 className="font-display text-base font-semibold text-text-white mb-3">
                      {t('essentialCookiesTitle')}
                    </h3>
                    <p className="text-text-muted text-sm mb-4">
                      {t('essentialCookiesIntro')}
                    </p>
                    <div className="overflow-x-auto rounded-lg border border-white/10">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 font-medium text-text-white">{t('essentialCookieName')}</th>
                            <th className="text-left py-3 px-4 font-medium text-text-white">{t('essentialCookiePurpose')}</th>
                            <th className="text-left py-3 px-4 font-medium text-text-white">{t('essentialCookieDuration')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {essentialCookies.map((cookie) => (
                            <tr key={cookie.nameKey} className="border-b border-white/5 last:border-0">
                              <td className="py-3 px-4 text-text-muted font-mono text-xs">{t(cookie.nameKey)}</td>
                              <td className="py-3 px-4 text-text-muted">{t(cookie.purposeKey)}</td>
                              <td className="py-3 px-4 text-text-muted">{t(cookie.durationKey)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
