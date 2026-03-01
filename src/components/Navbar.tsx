'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { key: 'home', href: '/' as const },
  { key: 'services', href: '/services' as const },
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
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Logo src="/icon.png" width={44} height={44} />
            <span className="font-ethno text-2xl gradient-text tracking-wider leading-none">
              ZYPTA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-accent-primary/15 text-text-white shadow-[0_0_15px_rgba(200,75,255,0.2)]'
                      : 'text-text-muted hover:text-text-white hover:bg-white/5'
                  }`}
                >
                  {t(item.key)}
                </Link>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed top-20 left-4 right-4 z-50 rounded-2xl p-5 overflow-hidden"
              style={{
                background: 'rgba(3,1,10,0.95)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(200,75,255,0.15)',
              }}
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-accent-primary/15 text-text-white'
                          : 'text-text-muted hover:text-text-white hover:bg-white/5'
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}
                <a
                  href="https://zyptabtp.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-text-muted hover:text-text-white hover:bg-white/5 flex items-center gap-1.5"
                >
                  ZyptaBTP
                  <ExternalLink size={12} className="opacity-50" />
                </a>
              </nav>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-text-muted">contact@zypta.be</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
