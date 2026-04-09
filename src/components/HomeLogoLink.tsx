'use client';

import type { ReactNode } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useSiteLoader } from '@/components/SiteLoaderContext';

type Props = {
  children: ReactNode;
  className?: string;
  /** Ex. fermer le menu mobile avant d’afficher le loader */
  onBeforeLoader?: () => void;
};

export default function HomeLogoLink({ children, className, onBeforeLoader }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { playHomeLoader } = useSiteLoader();

  return (
    <Link
      href="/"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onBeforeLoader?.();
        playHomeLoader(() => {
          if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            router.push('/');
          }
        });
      }}
    >
      {children}
    </Link>
  );
}
