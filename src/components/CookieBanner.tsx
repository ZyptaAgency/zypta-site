'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';

const CONSENT_KEY = 'cookie-consent';

export default function CookieBanner() {
  const t = useTranslations('cookies');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleChoice = (value: 'accepted' | 'refused') => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div
            className="max-w-4xl mx-auto rounded-2xl p-6 md:p-8 shadow-2xl border border-accent-primary/20"
            style={{
              background: 'rgba(15, 10, 26, 0.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <p className="text-text-muted text-sm md:text-base flex-1 leading-relaxed">
                {t('message')}{' '}
                <Link href="/privacy" className="text-accent-primary hover:underline">
                  {t('link')}
                </Link>
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => handleChoice('refused')}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium border border-white/20 text-text-muted hover:border-white/40 hover:text-text-white transition-colors"
                >
                  {t('refuse')}
                </button>
                <button
                  onClick={() => handleChoice('accepted')}
                  className="btn-primary px-4 py-2.5 text-sm"
                >
                  {t('accept')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
