'use client';

import {
  Globe,
  ShoppingCart,
  Search,
  Palette,
  Mail,
  Send,
} from 'lucide-react';

const tools = [
  { icon: Globe, label: 'WordPress' },
  { icon: ShoppingCart, label: 'Shopify' },
  { icon: Search, label: 'SEO/SEA' },
  { icon: Palette, label: 'Logo Design' },
  { icon: Mail, label: 'Mailchimp' },
  { icon: Send, label: 'Brevo' },
];

export default function MarqueeBand() {
  const doubled = [...tools, ...tools];

  return (
    <section className="relative z-10 py-8 overflow-hidden" style={{ background: 'var(--bg-deep)' }}>
      <div className="flex animate-marquee w-max">
        {doubled.map((tool, i) => (
          <div
            key={i}
            className="flex items-center gap-3 mx-8 text-text-muted"
          >
            <tool.icon size={20} className="text-accent-primary drop-shadow-[0_0_8px_rgba(200,75,255,0.6)]" />
            <span className="text-sm font-medium whitespace-nowrap">{tool.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
