'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Scissors, Wrench, Lightbulb, Briefcase } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const personas = [
  { icon: Scissors, color: '#ff6b35' },
  { icon: Wrench, color: '#c84bff' },
  { icon: Lightbulb, color: '#ff2d8f' },
  { icon: Briefcase, color: '#00d4ff' },
];

export default function ForWho() {
  const t = useTranslations('forWho');

  return (
    <section id="forwho" className="relative z-10 py-24 px-6">
      {/* Background orb */}
      <div
        className="nebula-orb w-[500px] h-[500px] top-[50%] left-[-10%] -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(123,47,255,0.15) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-6">
            {t('title')}
          </h2>
          <p className="text-text-muted text-lg max-w-3xl mx-auto">
            {t('desc')}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="flex justify-center gap-6 flex-wrap mb-12">
          {personas.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center"
            >
              <p.icon size={32} style={{ color: p.color, filter: `drop-shadow(0 0 10px ${p.color}60)` }} />
            </motion.div>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="text-center">
          <Link href="/services" className="btn-outline">
            {t('cta')}
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
