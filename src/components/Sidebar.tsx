'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { key: 'home', href: '/' as const },
  { key: 'services', href: '/services' as const },
  { key: 'about', href: '/about' as const },
  { key: 'contact', href: '/contact' as const },
];

export default function Sidebar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[240px] z-50 flex-col justify-between py-8 px-6 border-r border-accent-primary/20"
        style={{
          background: 'rgba(3,1,10,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div>
          <Link href="/" className="block mb-12">
            <Logo src="/logo.png" width={160} height={80} />
          </Link>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-accent-primary/15 text-text-white shadow-[0_0_20px_rgba(200,75,255,0.2)]'
                      : 'text-text-muted hover:text-text-white hover:bg-white/5'
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4">
          <LanguageSwitcher />
          <p className="text-xs text-text-muted">contact@zypta.be</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 border-b border-accent-primary/20"
        style={{
          background: 'rgba(3,1,10,0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <Logo src="/icon.png" width={34} height={34} />
          <span className="font-ethno text-lg gradient-text tracking-wider">
            ZYPTA
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-text-white p-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[280px] z-50 flex flex-col justify-between py-8 px-6 border-r border-accent-primary/20"
              style={{
                background: 'rgba(3,1,10,0.95)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div>
                <Link href="/" onClick={() => setMobileOpen(false)} className="block mb-10">
                  <Logo src="/logo.png" width={160} height={80} />
                </Link>
                <nav className="flex flex-col gap-2">
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
                            ? 'bg-accent-primary/15 text-text-white shadow-[0_0_20px_rgba(200,75,255,0.2)]'
                            : 'text-text-muted hover:text-text-white hover:bg-white/5'
                        }`}
                      >
                        {t(item.key)}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="space-y-4">
                <LanguageSwitcher />
                <p className="text-xs text-text-muted">contact@zypta.be</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
