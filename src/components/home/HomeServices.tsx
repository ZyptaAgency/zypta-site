'use client';

import { useTranslations } from 'next-intl';
import { Globe, ShoppingCart, Search, Palette, HardHat } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import { Link } from '@/i18n/routing';

const services = [
  { icon: Globe, key: 's1', color: '#ff6b35' },
  { icon: ShoppingCart, key: 's2', color: '#c84bff' },
  { icon: Search, key: 's3', color: '#00d4ff' },
  { icon: Palette, key: 's4', color: '#ff2d8f' },
  { icon: HardHat, key: 's5', color: '#2563EB', external: true },
];

export default function HomeServices() {
  const t = useTranslations('homeServices');

  return (
    <section className="relative z-10 py-16 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-white">
            {t('title')}
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <AnimatedSection key={s.key} delay={i * 0.08} className={s.key === 's5' ? 'md:col-span-2 md:max-w-xl md:mx-auto w-full' : ''}>
              {s.external ? (
                <a
                  href="https://zyptabtp.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-6 flex gap-4 border border-[#2563EB]/20 hover:border-[#2563EB]/40 transition-colors group block"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}20` }}
                  >
                    <s.icon size={20} style={{ color: s.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-muted text-sm leading-relaxed pt-1">
                      {t(s.key as 's1' | 's2' | 's3' | 's4' | 's5')}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="glass-card p-6 flex gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}20` }}
                  >
                    <s.icon size={20} style={{ color: s.color }} />
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed pt-1">
                    {t(s.key as 's1' | 's2' | 's3' | 's4' | 's5')}
                  </p>
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.4} className="text-center mt-8">
          <Link href="/services" className="btn-outline text-sm">
            {t('cta')}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
