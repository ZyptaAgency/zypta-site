'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { PricingNavLink } from '@/components/PricingNavProvider';
import HomeLogoLink from '@/components/HomeLogoLink';
import { Menu, X, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { key: 'home', href: '/' as const },
  { key: 'services', href: '/services' as const },
  { key: 'pricing', href: '/pricing' as const },
  { key: 'about', href: '/about' as const },
  { key: 'contact', href: '/contact' as const },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500 ${
          scrolled
            ? 'shadow-[0_0_40px_rgba(200,75,255,0.15)]'
            : ''
        }`}
        style={{
          background: scrolled
            ? 'rgba(3,1,10,0.85)'
            : 'rgba(3,1,10,0.5)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(200,75,255,0.15)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo: Z icon + ZYPTA typo */}
          <HomeLogoLink className="flex items-center gap-3 shrink-0">
            <Logo src="/z-mask.png" width={44} height={44} />
            <span className="font-ethno text-2xl gradient-text tracking-wider leading-none">
              ZYPTA
            </span>
          </HomeLogoLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <PricingNavLink
                  key={item.key}
                  href={item.href}
                  isPricing={item.key === 'pricing'}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-accent-primary/15 text-text-white shadow-[0_0_15px_rgba(200,75,255,0.2)]'
                      : 'text-text-muted hover:text-text-white hover:bg-white/5'
                  }`}
                >
                  {t(item.key)}
                </PricingNavLink>
              );
            })}
            <a
              href="https://zyptabtp.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 text-text-muted hover:text-text-white hover:bg-white/5 flex items-center gap-1.5"
            >
              ZyptaBTP
              <ExternalLink size={12} className="opacity-50" />
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/contact" className="hidden md:inline-flex btn-primary !py-2 !px-5 text-sm">
              {t('contact')}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu — plein écran, ergonomie tactile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="md:hidden fixed inset-0 z-[100] flex flex-col min-h-0"
            style={{
              background: 'var(--bg-void)',
              paddingTop: 'max(1.25rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))',
              paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
              paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background:
                  'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200,75,255,0.18), transparent 55%)',
              }}
            />

            <div className="relative flex items-center justify-between shrink-0 pb-6 border-b border-white/10">
              <span className="font-display text-xl font-bold text-text-white tracking-tight">{t('menu')}</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center min-w-[48px] min-h-[48px] -mr-1 rounded-2xl text-text-white hover:bg-white/10 active:bg-white/15 transition-colors touch-manipulation"
                aria-label={t('closeMenu')}
              >
                <X size={26} strokeWidth={2} />
              </button>
            </div>

            <nav className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-2 py-6 -mx-1 px-1">
              {navItems.map((item) => {
                const isActive =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <PricingNavLink
                    key={item.key}
                    href={item.href}
                    isPricing={item.key === 'pricing'}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center min-h-[52px] px-5 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 touch-manipulation ${
                      isActive
                        ? 'bg-accent-primary/20 text-text-white shadow-[0_0_24px_rgba(200,75,255,0.2)] border border-accent-primary/30'
                        : 'text-text-muted active:bg-white/10 border border-transparent'
                    }`}
                  >
                    {t(item.key)}
                  </PricingNavLink>
                );
              })}
              <a
                href="https://zyptabtp.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 min-h-[52px] px-5 py-3.5 rounded-2xl text-base font-semibold text-text-muted active:bg-white/10 transition-colors touch-manipulation"
              >
                ZyptaBTP
                <ExternalLink size={16} className="opacity-50 shrink-0" />
              </a>
            </nav>

            <div className="relative shrink-0 flex flex-col gap-4 pt-6 border-t border-white/10">
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-wider text-text-muted font-medium">{t('language')}</span>
                <div className="flex [&_button]:min-h-[48px] [&_button]:min-w-[56px] [&_button]:text-sm [&_button]:px-4">
                  <LanguageSwitcher />
                </div>
              </div>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center text-base min-h-[52px] touch-manipulation !py-3.5"
              >
                {t('contact')}
              </Link>
              <p className="text-center text-sm text-text-muted">contact@zypta.be</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
