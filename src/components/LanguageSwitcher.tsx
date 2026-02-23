'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (newLocale: 'fr' | 'en') => {
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', newLocale);
    }
  };

  return (
    <div className={`flex items-center gap-1 rounded-full p-1 border border-white/10 bg-white/5 ${isPending ? 'opacity-60' : ''}`}>
      <button
        onClick={() => switchTo('fr')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
          locale === 'fr'
            ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(200,75,255,0.5)]'
            : 'text-text-muted hover:text-text-white'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => switchTo('en')}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
          locale === 'en'
            ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(200,75,255,0.5)]'
            : 'text-text-muted hover:text-text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
