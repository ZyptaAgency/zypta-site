'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import PricingRouteLoader from './PricingRouteLoader';

const MIN_VISIBLE_MS = 1400;
const EXTRA_AFTER_ARRIVE_MS = 480;

type Ctx = { startPricingNav: (afterClick?: () => void) => void };

const PricingNavContext = createContext<Ctx | null>(null);

export function usePricingNav() {
  const ctx = useContext(PricingNavContext);
  if (!ctx) throw new Error('usePricingNav must be used within PricingNavProvider');
  return ctx;
}

export function PricingNavProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState(false);
  const startedAt = useRef<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const startPricingNav = useCallback(
    (afterClick?: () => void) => {
      afterClick?.();
      if (pathname === '/pricing') {
        document.getElementById('tarifs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      startedAt.current = Date.now();
      setOverlay(true);
      router.push('/pricing');
    },
    [pathname, router],
  );

  useEffect(() => {
    if (!overlay || startedAt.current === null) return;
    if (pathname !== '/pricing') return;

    const elapsed = Date.now() - startedAt.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed) + EXTRA_AFTER_ARRIVE_MS;
    const id = window.setTimeout(() => {
      setOverlay(false);
      startedAt.current = null;
    }, wait);
    return () => window.clearTimeout(id);
  }, [overlay, pathname]);

  useEffect(() => {
    if (!overlay) return;
    const onPopState = () => {
      setOverlay(false);
      startedAt.current = null;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [overlay]);

  useEffect(() => {
    if (!overlay) return;
    const id = window.setTimeout(() => {
      setOverlay(false);
      startedAt.current = null;
    }, 15000);
    return () => window.clearTimeout(id);
  }, [overlay]);

  return (
    <PricingNavContext.Provider value={{ startPricingNav }}>
      {children}
      <AnimatePresence mode="wait">
        {overlay ? <PricingRouteLoader key="pricing-nav-overlay" /> : null}
      </AnimatePresence>
    </PricingNavContext.Provider>
  );
}

type LinkHref = ComponentProps<typeof Link>['href'];

export function PricingNavLink({
  href,
  isPricing,
  className,
  onClick,
  children,
}: {
  href: LinkHref;
  isPricing: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const { startPricingNav } = usePricingNav();

  if (!isPricing) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        startPricingNav(onClick);
      }}
    >
      {children}
    </Link>
  );
}
