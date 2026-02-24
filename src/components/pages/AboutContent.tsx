'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Shield, Zap, ChevronDown } from 'lucide-react';
import Image from 'next/image';
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
          <h1 className="font-display text-5xl md:text-7xl font-normal gradient-text mb-4">
            <ZyptaText text={t('heroHeadline')} />
          </h1>
          <p className="text-text-muted text-lg md:text-xl">
            {t('heroSub')}
          </p>
        </AnimatedSection>

        {/* Founder */}
        <AnimatedSection className="mb-20">
          <div className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden ring-2 ring-accent-primary/30 shadow-[0_0_40px_rgba(200,75,255,0.2)]">
                <Image
                  src="/images/mahammoud-boulale.png"
                  alt="Mahammoud Boulale"
                  width={224}
                  height={224}
                  className="object-cover object-top w-full h-full"
                  priority
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="font-display text-2xl md:text-3xl font-bold gradient-text mb-2">
                {t('founderName')}
              </h2>
              <p className="text-accent-primary font-semibold text-sm mb-4">{t('founderRole')}</p>
              <p className="text-text-muted leading-relaxed">
                {t('founderBio')}
              </p>
            </div>
          </div>
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

        {/* Certifications */}
        <AnimatedSection className="mb-20">
          <h2 className="font-display text-3xl font-bold gradient-text mb-3">
            {t('certsTitle')}
          </h2>
          <p className="text-text-muted text-sm mb-8">{t('certsSub')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {([
              { logo: '/logos/ephec.png', bg: 'white', key: 'cert1', h: 24 },
              { logo: '/logos/scrum.png', bg: 'white', key: 'cert2', h: 24 },
              { logo: '/logos/scrum.png', bg: 'white', key: 'cert3', h: 24 },
              { logo: '/logos/google-ads.svg', bg: 'transparent', key: 'cert4', h: 24 },
              { logo: '/logos/opquast.svg', bg: 'white', key: 'cert5', h: 16 },
              { logo: '/logos/lje.png', bg: 'white', key: 'cert6', h: 24 },
            ] as const).map((cert, i) => (
              <AnimatedSection key={cert.key} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="glass-card p-5 h-full flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 p-1.5"
                      style={{ background: cert.bg }}
                    >
                      <Image
                        src={cert.logo}
                        alt=""
                        width={40}
                        height={cert.h}
                        className="object-contain"
                      />
                    </div>
                    <h4 className="font-display text-sm font-semibold text-text-white leading-tight">
                      {t(`${cert.key}Title`)}
                    </h4>
                  </div>
                  <p className="text-text-muted text-xs leading-relaxed">{t(`${cert.key}Issuer`)}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
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

        {/* Process - Parcours vertical */}
        <AnimatedSection className="mb-20">
          <h2 className="font-display text-3xl font-bold text-text-white mb-4">
            {t('processTitle')}
          </h2>
          <div className="glass-card p-8 md:p-10 overflow-hidden">
            <div className="relative pl-8">
              {/* Ligne de parcours verticale */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-accent-primary/40 via-accent-primary/50 to-transparent" />

              <div className="relative flex flex-col gap-8">
                {(['contact', 'proposal', 'build'] as const).map((step, i) => {
                  const parts = t('processText').split('.').filter(Boolean);
                  const text = parts[i]?.trim();
                  const stepTitle = t(`processStep${i + 1}`);
                  return text ? (
                    <AnimatedSection key={step} delay={i * 0.08}>
                      <div className="flex items-start gap-4">
                        <div className="relative z-10 -ml-2 w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-lg font-bold text-white bg-gradient-to-br from-accent-primary to-nova-core shadow-[0_0_25px_rgba(200,75,255,0.4)] ring-4 ring-[var(--bg-void)]">
                          {i + 1}
                        </div>
                        <div className="flex-1 pt-1">
                          <h4 className="font-display font-semibold text-text-white mb-2">{stepTitle}</h4>
                          <p className="text-text-muted text-sm leading-relaxed">
                            {text}{!text.endsWith('.') ? '.' : ''}
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ) : null;
                })}
              </div>
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
