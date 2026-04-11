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

const MIN_VISIBLE_MS = 2800;
const EXTRA_AFTER_ARRIVE_MS = 1100;

type Ctx = {
  startRouteNav: (target: string, afterClick?: () => void) => void;
  startPricingNav: (afterClick?: () => void) => void;
};

const PricingNavContext = createContext<Ctx | null>(null);

export function usePricingNav() {
  const ctx = useContext(PricingNavContext);
  if (!ctx) throw new Error('usePricingNav must be used within PricingNavProvider');
  return ctx;
}

export function PricingNavProvider({ children }: { children: ReactNode }) {
  const [overlay, setOverlay] = useState(false);
  const startedAt = useRef<number | null>(null);
  const targetPath = useRef<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const startRouteNav = useCallback(
    (target: string, afterClick?: () => void) => {
      afterClick?.();
      if (pathname === target) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      startedAt.current = Date.now();
      targetPath.current = target;
      setOverlay(true);
      router.push(target);
    },
    [pathname, router],
  );

  // Keep old name as alias for backwards compat
  const startPricingNav = useCallback(
    (afterClick?: () => void) => startRouteNav('/pricing', afterClick),
    [startRouteNav],
  );

  useEffect(() => {
    if (!overlay || startedAt.current === null || !targetPath.current) return;
    if (pathname !== targetPath.current) return;

    const elapsed = Date.now() - startedAt.current;
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed) + EXTRA_AFTER_ARRIVE_MS;
    const id = window.setTimeout(() => {
      setOverlay(false);
      startedAt.current = null;
      targetPath.current = null;
    }, wait);
    return () => window.clearTimeout(id);
  }, [overlay, pathname]);

  useEffect(() => {
    if (!overlay) return;
    const onPopState = () => {
      setOverlay(false);
      startedAt.current = null;
      targetPath.current = null;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [overlay]);

  useEffect(() => {
    if (!overlay) return;
    const id = window.setTimeout(() => {
      setOverlay(false);
      startedAt.current = null;
      targetPath.current = null;
    }, 15000);
    return () => window.clearTimeout(id);
  }, [overlay]);

  return (
    <PricingNavContext.Provider value={{ startRouteNav, startPricingNav }}>
      {children}
      <AnimatePresence mode="wait">
        {overlay ? <PricingRouteLoader key="route-nav-overlay" /> : null}
      </AnimatePresence>
    </PricingNavContext.Provider>
  );
}

type LinkHref = ComponentProps<typeof Link>['href'];

export function PricingNavLink({
  href,
  isPricing: _isPricing,
  className,
  onClick,
  children,
}: {
  href: LinkHref;
  isPricing?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const { startRouteNav } = usePricingNav();

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        startRouteNav(typeof href === 'string' ? href : '/', onClick);
      }}
    >
      {children}
    </Link>
  );
}
