'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageCircle, Layers, Rocket } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

const icons = [MessageCircle, Layers, Rocket];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  const steps = [
    { num: '01', title: t('step1title'), desc: t('step1desc') },
    { num: '02', title: t('step2title'), desc: t('step2desc') },
    { num: '03', title: t('step3title'), desc: t('step3desc') },
  ];

  return (
    <section id="how" className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text">
            {t('title')}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <AnimatedSection key={step.num} delay={i * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass-card p-8 text-center h-full"
                >
                  <div className="text-6xl font-display font-bold text-accent-primary/20 mb-4">
                    {step.num}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-accent-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-sm">{step.desc}</p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
