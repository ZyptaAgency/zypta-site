'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import ZyptaText from './ZyptaText';

export default function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('contact');

  return (
    <footer className="relative z-10 border-t border-accent-primary/20" style={{ background: 'var(--bg-void)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Logo src="/logo.png" width={120} height={120} />
            </Link>
            <p className="text-text-muted text-sm italic">{t('slogan')}</p>
            <LanguageSwitcher />
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <Clock size={16} className="text-accent-primary shrink-0" />
              <span>{t('hours')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <Phone size={16} className="text-accent-primary shrink-0" />
              <span>{tc('phone')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <Mail size={16} className="text-accent-primary shrink-0" />
              <span>{tc('emailAddress')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-muted">
              <MapPin size={16} className="text-accent-primary shrink-0" />
              <span>{tc('address')}</span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <a
              href="https://instagram.com/zypta.be"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(238,42,123,0.35)] hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(249,206,52,0.15), rgba(238,42,123,0.2), rgba(98,40,215,0.15))' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)' }}>
                <Instagram size={16} className="text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-text-white block">{tc('instagram')}</span>
                <span className="text-[11px] text-text-muted">{tc('instaAction')}</span>
              </div>
            </a>
            <a
              href="mailto:contact@zypta.be"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(234,67,53,0.3)] hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(234,67,53,0.15), rgba(197,34,31,0.12), rgba(234,67,53,0.1))' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #EA4335, #C5221F)' }}>
                <Mail size={16} className="text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-text-white block">{tc('emailAddress')}</span>
                <span className="text-[11px] text-text-muted">{tc('emailAction')}</span>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-text-muted"><ZyptaText text={t('rights')} /></p>
        </div>
      </div>
    </footer>
  );
}
