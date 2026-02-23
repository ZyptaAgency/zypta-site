'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Nebula orbs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="nebula-orb w-[500px] h-[500px] top-[10%] left-[10%]"
        style={{ background: 'radial-gradient(circle, rgba(255,107,53,0.35) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="nebula-orb w-[600px] h-[600px] top-[20%] right-[-10%]"
        style={{ background: 'radial-gradient(circle, rgba(200,75,255,0.3) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="nebula-orb w-[400px] h-[400px] bottom-[5%] left-[30%]"
        style={{ background: 'radial-gradient(circle, rgba(255,45,143,0.25) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="nebula-orb w-[350px] h-[350px] top-[5%] right-[20%]"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold gradient-text leading-[1.05] mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          {t('headline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          {t('sub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/services" className="btn-primary text-base">
            {t('cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
