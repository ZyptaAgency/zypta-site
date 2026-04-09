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
            <Logo src="/icon.png" width={44} height={44} />
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

      {/* Mobile menu — plein écran centré, inspiration type EE Studio (typo large, atmosphère calme) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-[100] flex flex-col min-h-0 overflow-hidden"
            style={{
              background: '#0a0a12',
              paddingTop: 'max(1rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
              paddingLeft: 'max(1.25rem, env(safe-area-inset-left))',
              paddingRight: 'max(1.25rem, env(safe-area-inset-right))',
            }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute w-[min(100vw,28rem)] h-[min(100vw,28rem)] rounded-full opacity-[0.22]"
                style={{
                  background: 'radial-gradient(circle, rgba(200,75,255,0.45) 0%, transparent 70%)',
                  top: '8%',
                  left: '5%',
                }}
              />
              <div
                className="absolute w-[min(90vw,24rem)] h-[min(90vw,24rem)] rounded-full opacity-[0.18]"
                style={{
                  background: 'radial-gradient(circle, rgba(255,107,53,0.35) 0%, transparent 70%)',
                  bottom: '12%',
                  right: '0%',
                }}
              />
              <div
                className="absolute w-[min(70vw,18rem)] h-[min(70vw,18rem)] rounded-full opacity-[0.14]"
                style={{
                  background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)',
                  top: '42%',
                  right: '18%',
                }}
              />
            </div>

            {/* Accents coin type EE (lignes fines) */}
            <div className="absolute top-6 left-6 w-10 h-10 pointer-events-none opacity-50">
              <div className="absolute top-0 left-0 w-full h-[1.5px] rounded-full bg-gradient-to-r from-accent-primary/80 to-transparent" />
              <div className="absolute top-0 left-0 w-[1.5px] h-full rounded-full bg-gradient-to-b from-accent-primary/80 to-transparent" />
            </div>
            <div className="absolute top-6 right-6 w-10 h-10 pointer-events-none opacity-50">
              <div className="absolute top-0 right-0 w-full h-[1.5px] rounded-full bg-gradient-to-l from-nova-ice/70 to-transparent" />
              <div className="absolute top-0 right-0 w-[1.5px] h-full rounded-full bg-gradient-to-b from-nova-ice/70 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between shrink-0">
              <HomeLogoLink
                className="flex items-center gap-2.5 shrink-0 opacity-90"
                onBeforeLoader={() => setMobileOpen(false)}
              >
                <Logo src="/icon.png" width={40} height={40} />
                <span className="font-ethno text-lg gradient-text tracking-wider leading-none">ZYPTA</span>
              </HomeLogoLink>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center min-w-[48px] min-h-[48px] rounded-full text-text-white/90 hover:bg-white/10 active:bg-white/15 transition-colors touch-manipulation"
                aria-label={t('closeMenu')}
              >
                <X size={26} strokeWidth={1.75} />
              </button>
            </div>

            <motion.nav
              className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center overflow-y-auto py-8 px-2"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06, delayChildren: 0.08 },
                },
              }}
            >
              {navItems.map((item) => {
                const isActive =
                  item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.key}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="w-full max-w-md"
                  >
                    <PricingNavLink
                      href={item.href}
                      isPricing={item.key === 'pricing'}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-center min-h-[56px] py-3 text-center font-display text-[clamp(1.75rem,8vw,2.75rem)] font-medium leading-tight tracking-tight transition-colors duration-200 touch-manipulation ${
                        isActive ? 'gradient-text' : 'text-text-white/75 hover:text-text-white active:text-text-white'
                      }`}
                    >
                      {t(item.key)}
                    </PricingNavLink>
                  </motion.div>
                );
              })}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="w-full max-w-md"
              >
                <a
                  href="https://zyptabtp.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 min-h-[56px] py-3 text-center font-display text-[clamp(1.35rem,5.5vw,1.85rem)] font-normal text-text-muted hover:text-text-white/90 transition-colors touch-manipulation"
                >
                  ZyptaBTP
                  <ExternalLink size={18} className="opacity-45 shrink-0" strokeWidth={1.75} />
                </a>
              </motion.div>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 shrink-0 flex flex-col items-center gap-5 pt-4"
            >
              <div className="h-[2px] w-[min(12rem,70vw)] rounded-full overflow-hidden bg-white/[0.07]">
                <div
                  className="h-full w-full rounded-full opacity-90"
                  style={{
                    background: 'linear-gradient(90deg, #ff6b35, #c84bff, #00d4ff)',
                  }}
                />
              </div>
              <div className="flex flex-col items-center gap-3 w-full">
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted/90 font-medium">
                  {t('language')}
                </span>
                <div className="flex [&_button]:min-h-[44px] [&_button]:min-w-[52px] [&_button]:text-sm [&_button]:px-4">
                  <LanguageSwitcher />
                </div>
              </div>
              <p className="text-xs text-text-muted/80 tracking-wide">contact@zypta.be</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
