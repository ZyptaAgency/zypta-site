'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Shield, Zap, ChevronDown } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';
import ZyptaText from '../ZyptaText';

const values = [
  { icon: Heart, color: '#ff6b35', key: 'v1' },
  { icon: Sparkles, color: '#c84bff', key: 'v2' },
  { icon: Shield, color: '#00d4ff', key: 'v3' },
  { icon: Zap, color: '#ff2d8f', key: 'v4' },
];

const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7'];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-display font-semibold text-text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown size={20} className="text-accent-primary" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6 text-text-muted text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AboutContent() {
  const t = useTranslations('about');

  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      {/* Nebula */}
      <div
        className="nebula-orb w-[500px] h-[500px] top-[5%] left-[-10%]"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Hero */}
        <AnimatedSection className="text-center mb-20">
          <h1 className="font-display text-5xl md:text-7xl font-bold gradient-text mb-4">
            <ZyptaText text={t('heroHeadline')} />
          </h1>
          <p className="text-text-muted text-lg md:text-xl">
            {t('heroSub')}
          </p>
        </AnimatedSection>

        {/* Story */}
        <AnimatedSection className="mb-20">
          <h2 className="font-display text-3xl font-bold text-text-white mb-4">
            {t('storyTitle')}
          </h2>
          <p className="text-text-muted leading-relaxed">
            <ZyptaText text={t('storyText')} />
          </p>
        </AnimatedSection>

        {/* Mission */}
        <AnimatedSection className="mb-20">
          <h2 className="font-display text-3xl font-bold text-text-white mb-4">
            {t('missionTitle')}
          </h2>
          <p className="text-text-muted leading-relaxed">
            {t('missionText')}
          </p>
        </AnimatedSection>

        {/* Values */}
        <AnimatedSection className="mb-20">
          <h2 className="font-display text-3xl font-bold gradient-text mb-8">
            {t('valuesTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.key} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass-card p-6 flex items-start gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${v.color}15` }}
                  >
                    <v.icon size={20} style={{ color: v.color }} />
                  </div>
                  <p className="text-text-white text-sm font-medium pt-1.5">
                    {t(v.key)}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Process */}
        <AnimatedSection className="mb-20">
          <h2 className="font-display text-3xl font-bold text-text-white mb-4">
            {t('processTitle')}
          </h2>
          <div className="glass-card p-8">
            <div className="relative pl-8 border-l-2 border-accent-primary/30 space-y-8">
              {['contact', 'proposal', 'build', 'launch'].map((step, i) => (
                <div key={step} className="relative">
                  <div className="absolute -left-[calc(0.5rem+9px)] top-1 w-4 h-4 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(200,75,255,0.5)]" />
                  <p className="text-text-muted text-sm leading-relaxed">
                    {i === 0 && t('processText').split('.')[0] + '.'}
                    {i === 1 && t('processText').split('.')[1]?.trim() + '.'}
                    {i === 2 && t('processText').split('.')[2]?.trim() + '.'}
                    {i === 3 && t('processText').split('.').slice(3).join('.').trim()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ */}
        <AnimatedSection>
          <h2 className="font-display text-3xl font-bold gradient-text mb-8">
            {t('faqTitle')}
          </h2>
          <div className="space-y-4">
            {faqKeys.map((key) => (
              <FaqItem
                key={key}
                question={t(`${key}q`)}
                answer={t(`${key}a`)}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
