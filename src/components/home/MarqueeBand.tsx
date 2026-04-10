'use client';

import { useMessages } from 'next-intl';
import type { LucideIcon } from 'lucide-react';
import {
  Search,
  LineChart,
  Zap,
  Gauge,
  Accessibility,
  Smartphone,
  Sparkles,
  BadgeCheck,
  Globe2,
  ShieldCheck,
  Target,
  Code2,
  BarChart3,
} from 'lucide-react';

const ICONS: LucideIcon[] = [
  Search,
  LineChart,
  Zap,
  Gauge,
  Accessibility,
  Smartphone,
  Sparkles,
  BadgeCheck,
  Globe2,
  ShieldCheck,
  Target,
  Code2,
  BarChart3,
];

type MarqueeMessages = { marqueeBand?: { items?: string[] } };

export default function MarqueeBand() {
  const messages = useMessages() as MarqueeMessages;
  const items = messages.marqueeBand?.items?.length
    ? messages.marqueeBand.items
    : [
        'SEO & SEA',
        'Web performance',
        'Core Web Vitals',
        'Accessibility',
        'Mobile-first',
        'UX',
        'Best practices',
        'E-commerce',
        'Security',
        'Conversion',
        'Semantic HTML',
        'Analytics',
      ];

  const doubled = [...items, ...items];

  return (
    <section
      className="relative z-10 py-10 md:py-16 overflow-hidden border-y border-white/[0.08]"
      style={{
        background:
          'linear-gradient(180deg, rgba(13,5,33,0.98) 0%, rgba(18,10,28,1) 50%, rgba(13,5,33,0.98) 100%), var(--bg-deep)',
      }}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(200,75,255,0.12) 0%, transparent 55%)',
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 md:w-44 z-[1] bg-gradient-to-r from-[#0d0521] via-[#0d0521]/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 md:w-44 z-[1] bg-gradient-to-l from-[#0d0521] via-[#0d0521]/90 to-transparent" />

      <div className="flex animate-marquee w-max items-center gap-4 md:gap-6 py-1">
        {doubled.map((label, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={`${i}-${label}`}
              className="group flex shrink-0 items-center gap-3 md:gap-4 rounded-full border border-white/[0.12] bg-gradient-to-br from-white/[0.09] via-white/[0.04] to-white/[0.02] px-5 py-3 md:px-8 md:py-4 shadow-[0_0_32px_rgba(200,75,255,0.14),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-[box-shadow,border-color] duration-300 hover:border-accent-primary/35 hover:shadow-[0_0_40px_rgba(200,75,255,0.22),inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <span className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-primary/25 to-nova-ice/10 ring-1 ring-white/10">
                <Icon
                  className="h-5 w-5 md:h-6 md:w-6 text-accent-primary drop-shadow-[0_0_10px_rgba(200,75,255,0.55)] transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
              <span className="font-body text-base md:text-lg font-semibold tracking-tight text-text-white whitespace-nowrap pr-1">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
