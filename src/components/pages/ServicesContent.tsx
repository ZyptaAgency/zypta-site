'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Globe, ShoppingCart, Search, Palette, HardHat, ExternalLink } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const services = [
  { icon: Globe, color: '#ff6b35', titleKey: 's1title', descKey: 's1desc' },
  { icon: ShoppingCart, color: '#c84bff', titleKey: 's2title', descKey: 's2desc' },
  { icon: Search, color: '#00d4ff', titleKey: 's3title', descKey: 's3desc' },
  { icon: Palette, color: '#ff2d8f', titleKey: 's4title', descKey: 's4desc' },
  { icon: HardHat, color: '#2563EB', titleKey: 's5title', descKey: 's5desc', external: true },
];

export default function ServicesContent() {
  const t = useTranslations('services');

  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      {/* Nebula */}
      <div
        className="nebula-orb w-[600px] h-[600px] top-[0%] right-[-15%]"
        style={{ background: 'radial-gradient(circle, rgba(200,75,255,0.2) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            {t('title')}
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {t('intro')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc, i) => (
            <AnimatedSection key={svc.titleKey} delay={i * 0.1} className={svc.titleKey === 's5title' ? 'md:col-span-2 md:max-w-lg md:mx-auto w-full' : ''}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className={`glass-card p-8 h-full flex flex-col ${svc.external ? 'border border-[#2563EB]/20' : ''}`}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${svc.color}15` }}
                >
                  <svc.icon
                    size={28}
                    style={{ color: svc.color, filter: `drop-shadow(0 0 10px ${svc.color}60)` }}
                  />
                </div>
                <h3 className="font-display text-xl font-semibold text-text-white mb-3">
                  {t(svc.titleKey)}
                </h3>
                <p className="text-text-muted text-sm flex-1 mb-6">
                  {t(svc.descKey)}
                </p>
                {svc.external ? (
                  <a
                    href="https://zyptabtp.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm w-fit inline-flex items-center gap-2"
                  >
                    {t('s5cta')}
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <Link href="/contact" className="btn-outline text-sm w-fit">
                    {t('cta')}
                  </Link>
                )}
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
