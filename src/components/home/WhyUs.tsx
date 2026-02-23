'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { GraduationCap, Palette, Trophy, Zap } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import ZyptaText from '../ZyptaText';

const items = [
  { icon: GraduationCap, color: '#ff6b35', key: 'point1' },
  { icon: Palette, color: '#c84bff', key: 'point2' },
  { icon: Trophy, color: '#ff2d8f', key: 'point3' },
  { icon: Zap, color: '#00d4ff', key: 'point4' },
];

export default function WhyUs() {
  const t = useTranslations('whyUs');

  return (
    <section id="why" className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            <ZyptaText text={t('title')} />
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <AnimatedSection key={item.key} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="glass-card p-8 flex items-start gap-5"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}15` }}
                >
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <p className="text-text-white text-base font-medium pt-2">
                  {t(item.key)}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
