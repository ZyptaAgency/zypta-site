'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import HomeLogoLink from '@/components/HomeLogoLink';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import ZyptaText from './ZyptaText';
import WhatsAppCtaLink from './WhatsAppCtaLink';

export default function Footer() {
  const t = useTranslations('footer');
  const tc = useTranslations('contact');

  return (
    <footer className="relative z-10 border-t border-accent-primary/20" style={{ background: 'var(--bg-void)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Brand */}
          <div className="space-y-4">
            <HomeLogoLink className="flex items-center gap-3">
              <Logo src="/z-mask.png" width={56} height={56} />
              <span className="font-ethno text-2xl md:text-3xl gradient-text tracking-wider leading-none">
                ZYPTA
              </span>
            </HomeLogoLink>
            <div className="flex flex-col items-start gap-0.5 font-ethno text-sm md:text-base tracking-wider leading-tight">
              <span className="block gradient-text">{t('slogan1')}</span>
              <span className="block gradient-text">{t('slogan2')}</span>
              <span className="block gradient-text">{t('slogan3')}</span>
            </div>
            <a
              href="https://zyptabtp.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#2563EB] hover:text-[#3b82f6] transition-colors font-medium"
            >
              ZyptaBTP
              <ExternalLink size={12} />
            </a>
            <div className="w-fit">
              <LanguageSwitcher />
            </div>
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
            <WhatsAppCtaLink title={tc('phone')} subtitle={tc('whatsappAction')} />
            <a
              href="https://instagram.com/zypta.be"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(238,42,123,0.35)] hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgba(249,206,52,0.15), rgba(238,42,123,0.2), rgba(98,40,215,0.15))' }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                <svg width="16" height="12" viewBox="0 0 256 193">
                  <path fill="#4285F4" d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z"/>
                  <path fill="#34A853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837-27.026 25.798v98.91Z"/>
                  <path fill="#EA4335" d="m58.182 93.14-4.174-38.647 4.174-36.989L128 69.868l69.818-52.364 4.67 34.992-4.67 40.644L128 145.504z"/>
                  <path fill="#FBBC04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218Z"/>
                  <path fill="#C5221F" d="m0 49.504 26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23v23.273Z"/>
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-text-white block">{tc('emailAddress')}</span>
                <span className="text-[11px] text-text-muted">{tc('emailAction')}</span>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <span className="text-xs text-text-muted">{t('paymentMethods')}</span>
              <div className="h-9 px-4 flex items-center rounded-lg bg-white shadow-sm">
                <img src="/logos/paypal.svg" alt="PayPal" className="h-5 w-auto" />
              </div>
            </div>
            <p className="text-xs text-text-muted">
              <ZyptaText text={t('rights')} />
              {' — '}
              <Link href="/privacy" className="text-accent-primary/80 hover:text-accent-primary hover:underline transition-colors">
                {t('privacy')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
